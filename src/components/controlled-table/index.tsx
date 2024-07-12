'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import Table, { type TableProps } from '@/components/ui/table';
import { Title, Loader } from 'rizzui';
import cn from '@/utils/class-names';
import type { TableFilterProps } from '@/components/controlled-table/table-filter';
import type { TablePaginationProps } from '@/components/controlled-table/table-pagination';

const TableFilter = dynamic(
  () => import('@/components/controlled-table/table-filter'),
  { ssr: false }
);

const TablePagination = dynamic(
  () => import('@/components/controlled-table/table-pagination'),
  { ssr: false }
);

type ControlledTableProps = {
  isLoading?: boolean;
  showLoadingText?: boolean;
  filterElement?: React.ReactElement;
  filterOptions?: TableFilterProps;
  paginatorOptions?: TablePaginationProps;
  tableFooter?: React.ReactNode;
  className?: string;
  paginatorClassName?: string;
} & TableProps;

export default function ControlledTable({
  isLoading,
  filterElement,
  filterOptions,
  paginatorOptions,
  tableFooter,
  showLoadingText,
  paginatorClassName,
  className,
  ...tableProps
}: ControlledTableProps) {
  if (isLoading) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Loader variant="spinner" size="xl" />
        {showLoadingText ? (
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        ) : null}
      </div>
    );
  }
  const a = 1
  const handlePageChange = (page: number) => {
    
    if (paginatorOptions && paginatorOptions.onChange) {
      paginatorOptions.onChange(page, a);
    }
  };

  return (
    <>
      {!isEmpty(filterOptions) && (
        <TableFilter {...filterOptions}>{filterElement}</TableFilter>
      )}

      <div className="relative">
        <Table
          scroll={{ x: 1300 }}
          rowKey={(record) => record.id}
          className={cn(className)}
          {...tableProps}
        />

        {tableFooter ? tableFooter : null}
      </div>

      {/* {!isEmpty(paginatorOptions) && (
        <div className={paginatorClassName}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(paginatorOptions.current - 1);
            }}
            className={paginatorOptions.current === 1 ? 'disabled' : ''}
          >
            Previous
          </a>
          <span>{`Page ${paginatorOptions.current} of ${Math.ceil(paginatorOptions.total / paginatorOptions.pageSize)}`}</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(paginatorOptions.current + 1);
            }}
            className={paginatorOptions.current === Math.ceil(paginatorOptions.total / paginatorOptions.pageSize) ? 'disabled' : ''}
          >
            Next
          </a>
        </div>
      )} */}
    </>
  );
}
