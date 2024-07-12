'use client';

import dynamic from 'next/dynamic';
import { PiTrashDuotone } from 'react-icons/pi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Title } from 'rizzui';

// import { GetColumns } from '@/app/shared/jobcard/jobcard-list/list/columns';
import { GetColumns } from './columns';
import ControlledTable from '@/components/controlled-table';
import DateFiled from '@/components/controlled-table/date-field';
import { useMedia } from '@/hooks/use-media';
import { useTable } from '@/hooks/use-table';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';
import StatusField from '@/components/controlled-table/status-field';
import { appointmentData, appointmentTypes } from '@/data/appointment-data';
import { useColumn } from '@/hooks/use-column';
import cn from '@/utils/class-names';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchJobcardsThunk } from '@/redux/features/jobcard-slice';


const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const filterState = {
  date: [null, null],
  status: '',
  paymentMethod: '',
};

export const appointmentTypesOptions = Object.entries(appointmentTypes).map(
  ([value, label]) => ({ label, value })
);

const statusOptions = [
  {
    value: 'Created',
    label: 'Created job card',
  },
  {
    value: 'waiting',
    label: 'Waiting',
  },
  {
    value: 'waiting',
    label: 'Waiting',
  },
];

export default function JobcardList() {
  const [pageSize, setPageSize] = useState(10);
  const [_, setCheckedItems] = useState<string[]>([]);

  const isMediumScreen = useMedia('(max-width: 1860px)', false);

  const authToken = localStorage.getItem("accessToken")
  const dispatch = useDispatch<AppDispatch>()
  const [current, setCurrentPage] = useState(1)

  const [limit] = useState(5)
  const [offset, setOffset] = useState(0)

  const next = useSelector((state:RootState) => state.jobcardreducer.next)
  const prev = useSelector((state:RootState) => state.jobcardreducer.previous)

  console.log("next url from jobcard table  ::", next)
  console.log("prev url from jobcard table  ::", prev)

  const jobCardData = useSelector(
    (state: RootState) => state.jobcardreducer.jobcards
  )

  console.log("jobcard data :: :::::", jobCardData)
  console.log("jobcard data :: :::::", jobCardData)

  const handleNextPage = () =>{
    if (next){
      const url = new URL(next)
      const newOffset = parseInt(url.searchParams.get('offset') || '0');
      setOffset(newOffset)
      setCurrentPage(current + 1)
    }
  }

  const handlePreviousPage = () =>{
    if (prev){
      const url = new URL(prev)
      const newOffset = parseInt(url.searchParams.get('offset') || '0')
      setOffset(newOffset)
      setCurrentPage(current - 1)
    }
  }

  useEffect(() =>{
    dispatch(fetchJobcardsThunk({authToken: authToken as string, limit, offset}))
  }, [authToken, limit, offset, dispatch])

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setCheckedItems((prevItems) => [...prevItems, id]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    handleDelete,
    handleReset,
    handleSelectAll,
    handleRowSelect,
    setSelectedRowKeys,
    selectedRowKeys,
  } = useTable(jobCardData, pageSize, filterState);

  const columns = useMemo(
    () =>
      GetColumns({
        data: jobCardData,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      onChecked,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (

    <>
      {
        jobCardData && jobCardData.length ?  (

      <div
        className={cn(
          '[&_.table-filter>div:first-child]:grow [&_.table-filter>div:first-child]:justify-between',
          !isMediumScreen && '[&_.table-filter>div:first-child]:flex-row-reverse'
        )}
      >

        <ControlledTable
          variant="modern"
          isLoading={isLoading}
          showLoadingText={true}
          data={tableData}
          scroll={{
            x: 920,
          }}
          // @ts-ignore
          columns={visibleColumns}
          // paginatorOptions={{
          //   pageSize,
          //   setPageSize,
          //   total: totalItems,
          //   current: currentPage,
          //   onChange: (page: number) => handlePaginate(page),
          // }}
          filterOptions={{
            searchTerm,
            onSearchClear: () => {
              handleSearch('');
            },
            onSearchChange: (event) => {
              handleSearch(event.target.value);
            },
            hasSearched: isFiltered,
            columns,
            checkedColumns,
            setCheckedColumns,
          }}
          className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
          filterElement={
            <div
              className={cn(
                'flex',
                isMediumScreen ? 'flex-col gap-6' : 'flex-row items-center gap-3'
              )}
            >
              {!isMediumScreen && (
                <Title
                  as="h3"
                  className="rizzui-title-h3 pe-4 text-base font-semibold sm:text-lg"
                >
                  All Appointment
                </Title>
              )}

              <DateFiled
                selected={getDateRangeStateValues(filters['date'][0])}
                startDate={getDateRangeStateValues(filters['date'][0])}
                endDate={getDateRangeStateValues(filters['date'][1])}
                className="w-full"
                dateFormat="dd MMM yyyy"
                onChange={(date: any) => {
                  updateFilter('date', date);
                }}
                placeholderText="Select created date"
                {...(isMediumScreen && {
                  inputProps: {
                    label: 'Created Date',
                    labelClassName: 'font-medium text-gray-700',
                  },
                })}
                maxDate={new Date()}
              />
              <StatusField
                dropdownClassName="!z-10"
                className="w-full min-w-[170px] @[35rem]:w-auto"
                placeholder="Select type"
                options={appointmentTypesOptions}
                value={filters['type']}
                onChange={(value: string) => {
                  updateFilter('type', value);
                }}
                getOptionValue={(option: { value: any }) => option.value}
                displayValue={(selected: string) =>
                  appointmentTypesOptions.find(
                    (option) => option.label === selected
                  )?.label ?? ''
                }
                placement="bottom-start"
                {...(isMediumScreen && {
                  label: 'Service Type',
                  labelClassName: 'font-medium text-gray-700',
                })}
              />
              <StatusField
                dropdownClassName="!z-10"
                className="w-full @[35rem]:w-auto"
                options={statusOptions}
                value={filters['status']}
                onChange={(value: string) => {
                  updateFilter('status', value);
                }}
                getOptionValue={(option: { value: any }) => option.value}
                {...(isMediumScreen && {
                  label: 'Status',
                  labelClassName: 'font-medium text-gray-700',
                })}
              />

              {isFiltered ? (
                <Button
                  size="sm"
                  onClick={() => {
                    handleReset();
                  }}
                  className="h-8 bg-gray-200/70"
                  variant="flat"
                >
                  <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
                </Button>
              ) : null}
            </div>
          }
          tableFooter={
            <TableFooter
              checkedItems={selectedRowKeys}
              handleDelete={(ids: string[]) => {
                setSelectedRowKeys([]);
                handleDelete(ids);
              }}
            >
              <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
                Download {selectedRowKeys.length}{' '}
                {selectedRowKeys.length > 1 ? 'Appointments' : 'Appointment'}
              </Button>
            </TableFooter>
          }
        />

<div className="flex justify-items-end">
                  <nav className=" rounded-full px-4 py-2">
   
                      <ul className="flex text-gray-600 gap-4 font-medium py-2">
                        {
                          prev ? (
                              <li>
                                  <Button onClick={handlePreviousPage} disabled={!prev} className="rounded-lg  shadow-md px-4 py-2 bg-blue-500 text-white ">Prev</Button>
                              </li>

                          ): <></>
                        }
                          {
                            next || prev ? (

                              <li>
                              <p 
                                  className=" px-4 py-2  ">{current} </p>
                          </li>
                            ) : <></>
                          }
                          {
                            next ? (

                              <li>
                                  <Button onClick={handleNextPage} disabled={!next} className="rounded-lg  shadow-md px-4 py-2 bg-blue-500 text-white ">Next</Button>
                              </li>
                            ) : <></>
                          }

                      </ul>
                  </nav>
                </div>


      </div>
        ) :(
          
                <>
                <p>no data present</p>
                </>
              )
            }
    </>
  );
}
