'use client';

import React from 'react';
import { defaultColumns } from './column';

// import MainTable from '../../table/main-table';
import MainTable from '@/components/table/main-table';


import { useDirection } from '@/hooks/use-direction';
import WidgetCard from '@/components/cards/widget-card';
import { Person, defaultData } from '@/data/tan-table-data';
/////
// import { CustomExpandedComponent } from '../custom-table-components';

// import { useTanStackTable } from '../custom-table-components/use-TanStack-Table';
////
import { useTanStackTable } from '@/components/tan-table/custom-table-components/use-TanStack-Table';

import { JobCardExpandedComponent } from './expandable-component';
import TableToolbar from '@/components/tan-table/table-toolbar';
import JobCardTableToolbar from './table-toolbar';



export default function JobCardTable() {
  const { direction } = useDirection();
  const { table, setData } = useTanStackTable<Person>({
    tableData: defaultData,
    columnConfig: defaultColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 4,
        },
      },

      filterFns: {
        statusFilter: (row, columnId, value) => {
          if (!value) return false;
          let status =
            row.original[columnId].toLowerCase() === value.toLowerCase()
              ? true
              : false;
          return status;
        },
        priceFilter: (row, columnId, value) => {
          if (!value) return false;
          // console.log('custom filter conditions', row, columnId, value);
          return true;
        },
        createdDate: (row, columnId, value) => {
          if (!value) return false;
          // console.log('custom filter conditions', row, columnId, value);
          return true;
        },
        dueDate: (row, columnId, value) => {
          if (!value) return false;
          // console.log('custom filter conditions', row, columnId, value);
          return true;
        },
      },

      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
      },
      enableColumnResizing: true,
      columnResizeDirection: direction as any,
      columnResizeMode: 'onChange',
    },
  });

  return (
    <>
 
      <WidgetCard title={'Jobcard table'} className="flex flex-col gap-4">


        <TableToolbar table={table} />
        {/* <JobCardTableToolbar table={table} /> */}
        <MainTable
          table={table}
          variant={'modern'}
          components={{
            expandedComponent: JobCardExpandedComponent,
          }}
        />
        <p>Pagination</p>

      </WidgetCard>
    </>
  );
}
