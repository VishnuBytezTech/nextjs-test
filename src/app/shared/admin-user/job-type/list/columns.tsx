'use client';

import { HeaderCell } from '@/components/ui/table';
import {
  Text,
  Checkbox,
  ActionIcon,
  Tooltip,
  Select,
  Title,
  Button,
} from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import AvatarCard from '@/components/ui/avatar-card';
import DeletePopover from '@/app/shared/delete-popover';
import DateCell from '@/components/ui/date-cell';
import { Type } from '@/data/appointment-data';
import { useState } from 'react';
import {
  PiCalendarCheckLight,
  PiCheckCircleBold,
  PiClockBold,
  PiMapPinLight,
  PiXBold,
} from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CalenderIcon from '@/components/icons/calendar';
import { LuCalendarDays } from 'react-icons/lu';

////////////
// import AppointmentDetails from './appointment-details';
// import CreateUpdateAppointmentForm from '../appointment-form';

import CreateUpdateAppointmentForm from '@/app/shared/appointment/appointment-list/appointment-form';
// import ClientDetails from './client-details';

import JobTypeDetails from './job-type-details';
///////////////////////////////////////////

const statusOptions = [
  { label: 'Waiting', value: 'Waiting' },
  { label: 'Scheduled', value: 'Scheduled' },
];

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const GetColumns = ({
  handleSelectAll,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  data,
  checkedItems,
  onChecked,
}: Columns) => {
  return [
    // {
    //   title: (
    //     <div className="ps-3.5">
    //       <Checkbox
    //         title={'Select All'}
    //         onChange={handleSelectAll}
    //         // checked={checkedItems.length === data.length}
    //         className="cursor-pointer"
    //       />
    //     </div>
    //   ),
    //   dataIndex: 'checked',
    //   key: 'checked',
    //   width: 30,
    //   render: (_: any, row: any) => (
    //     <div className="inline-flex ps-3.5">
    //       <Checkbox
    //         aria-label={'ID'}
    //         className="cursor-pointer"
    //         checked={checkedItems.includes(row.id)}
    //         {...(onChecked && { onChange: () => onChecked(row.id) })}
    //       />
    //     </div>
    //   ),
    // },

    {
      title: <HeaderCell title="Name" />,
      onHeaderCell: () => onHeaderCellClick('id'),

      // the value gets in column
      dataIndex: 'name',
      key: 'name',
      width: 180,
      render: (name: string) => <Text>{name}</Text>,
    },

    // {
    //   title: <HeaderCell title="Email" />,
    //   onHeaderCell: () => onHeaderCellClick('email'),
    //   dataIndex: 'email',
    //   key: 'email',
    //   width: 180,
    //   render: (email: {email: string }) => (
    //     <div>
    //       <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
    //         {email}
    //       </Text>
    //     </div>
    //   ),
    // },

    // {
    //   title: <HeaderCell title="Phone" />,
    //   onHeaderCell: () => onHeaderCellClick('phone'),
    //   dataIndex: 'phone',
    //   key: 'phone',
    //   width: 120,
    //   render: (phone: { phone: string;  }) => (
    //     <div>
    //       <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
    //         {phone}
    //       </Text>
    //     </div>
    //   ),
    // },

    // {
    //   title: (
    //     <HeaderCell
    //       title={<span className="whitespace-nowrap">Country</span>}
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'country'
    //       }
    //     />
    //   ),
    //   dataIndex: 'country',
    //   key: 'country',
    //   width: 120,
    //   onHeaderCell: () => onHeaderCellClick('type'),
    //   render: (country: Type) => (
    //     <Text className="whitespace-nowrap font-medium text-gray-900">
    //       {country.name}
    //     </Text>
    //   ),
    // },

    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, row: any) => (
        <RenderAction row={row} onDeleteItem={onDeleteItem} />
      ),
    },

    // {
    //   title: (
    //     <HeaderCell title={<span className="whitespace-nowrap">Date</span>} />
    //   ),
    //   dataIndex: 'date',
    //   key: 'date',
    //   width: 250,
    //   render: (createdDate: Date) => <DateCell date={createdDate} />,
    // },



    // {
    //   title: <HeaderCell title="Duration" />,
    //   dataIndex: 'duration',
    //   key: 'duration',
    //   width: 150,
    //   render: (duration: number) => {
    //     const durationHour = Math.trunc(duration / 60);
    //     return (
    //       <span className="whitespace-nowrap font-semibold">
    //         {durationHour > 0 && `${Math.trunc(duration / 60)}h`}{' '}
    //         {duration % 60 > 0 ? `${duration % 60}m` : null}
    //       </span>
    //     );
    //   },
    // },

    // {
    //   title: (
    //     <HeaderCell
    //       title="Payment"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'amount'
    //       }
    //     />
    //   ),
    //   dataIndex: 'amount',
    //   key: 'amount',
    //   onHeaderCell: () => onHeaderCellClick('amount'),
    //   width: 180,
    //   render: (amount: number) => (
    //     <span className="whitespace-nowrap font-semibold">${amount}</span>
    //   ),
    // },

    // {
    //   title: (
    //     <HeaderCell
    //       title="Status"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
    //       }
    //     />
    //   ),
    //   dataIndex: 'status',
    //   key: 'status',
    //   width: 260,
    //   onHeaderCell: () => onHeaderCellClick('status'),
    //   render: (status: string) => {
    //     return <StatusSelect selectItem={status} />;
    //   },
    // },



  ];
};

function StatusSelect({ selectItem }: { selectItem?: string }) {
  const selectItemValue = statusOptions.find(
    (option) => option.label === selectItem
  );
  const [value, setValue] = useState(selectItemValue);
  return (
    <Select
      dropdownClassName="!z-10"
      inPortal={false}
      placeholder="Select Role"
      options={statusOptions}
      value={value}
      onChange={setValue}
      displayValue={(option: { value: any }) =>
        renderOptionDisplayValue(option.value as string)
      }
    />
  );
}

function renderOptionDisplayValue(value: string) {
  switch (value) {
    case 'Scheduled':
      return (
        <div className="flex items-center">
          <PiClockBold className="shrink-0 fill-green-dark text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <PiCheckCircleBold className="shrink-0 fill-orange text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
  }
}

function RenderAction({
  row,
  onDeleteItem,
}: {
  row: any;
  onDeleteItem: (id: string) => void;
}) {
  const { openModal, closeModal } = useModal();
  function handleCreateModal() {
    closeModal(),
      openModal({
        view: <CreateUpdateAppointmentForm />,
        customSize: '520px',
      });
  }
  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <Tooltip
        size="sm"
        content={'View Client'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'View Client'}
          className="hover:!border-gray-900 hover:text-gray-700"
          onClick={() =>
            openModal({
              view: (
                <JobTypeDetails
                  data={row}
                  onDelete={() => onDeleteItem(row.id)}
                  onEdit={handleCreateModal}
                />
              ),
              customSize: '620px',
            })
          }
        >
          <EyeIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
      <DeletePopover
        title={`Delete the appointment`}
        description={`Are you sure you want to delete this #${row.id} appointment?`}
        onDelete={() => onDeleteItem(row.id)}
      />
    </div>
  );
}
