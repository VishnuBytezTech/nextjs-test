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
// import CreateUpdateAppointmentForm from '../appointment-form';
import CreateUpdateAppointmentForm from '@/app/shared/appointment/appointment-list/appointment-form';
import JobcardDetails from './jobcard-details';

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

    {
      title: <HeaderCell title="REF" />,
      onHeaderCell: () => onHeaderCellClick('phone'),
      dataIndex: 'internal_ref',
      key: 'internal_ref',
      width: 120,
      render: (internal_ref: { internal_ref: string;  }) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {/* {internal_ref} */}
            {internal_ref.internal_ref}
          </Text>
        </div>
      ),
    },

    {
      title: <HeaderCell title="Description" />,
      onHeaderCell: () => onHeaderCellClick('phone'),
      dataIndex: 'description',
      key: 'description',
      width: 120,
      render: (description: { description: string;  }) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {/* {description} */}
            {description.description}
          </Text>
        </div>
      ),
    },

    
        {
          title: (
            <HeaderCell
              title="Status"
            />
          ),
          dataIndex: 'job_card_status',
          key: 'job_card_status',
          width: 50, 
          onHeaderCell: () => onHeaderCellClick('status'),
          render: (job_card_status: string) => {
            const color = job_card_status === 'active' ? 'red' : 'green';
            return <span style={{ color }}>{job_card_status === 'active' ? 'Active' : 'Active'}</span>;
          },
        },
    
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
    //     <div className="ps-3.5">
    //       <Checkbox
    //         title={'Select All'}
    //         onChange={handleSelectAll}
    //         checked={checkedItems.length === data.length}
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

    // {
    //   title: <HeaderCell title="REF" />,
    //   onHeaderCell: () => onHeaderCellClick('doctor.name'),
    //   dataIndex: 'internal_ref',
    //   key: 'internal_ref',
    //   width: 320,
    //   render: (doctor: { name: string; email: string; avatar: string }) => (
    //     <AvatarCard
    //       src={doctor.avatar}
    //       name={doctor.name}
    //       description={doctor.email}
    //     />
    //   ),
    // },


    // {
    //   title: (
    //     <HeaderCell
    //       title="REF"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'amount'
    //       }
    //     />
    //   ),
    //   dataIndex: 'internal_ref',
    //   key: 'internal_ref',
    //   onHeaderCell: () => onHeaderCellClick('amount'),
    //   width: 180,
    //   render: (amount: number) => (
    //     <span className="whitespace-nowrap font-semibold">${internal_ref}</span>
    //   ),
    // },


    // {
    //   title: <HeaderCell title="Description" />,
    //   dataIndex: 'description',
    //   key: 'description',
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
    //   title: <HeaderCell title="Job id" />,
    //   onHeaderCell: () => onHeaderCellClick('id'),
    //   dataIndex: 'id',
    //   key: 'id',
    //   width: 130,
    //   render: (id: string) => <Text>#{id}</Text>,
    // },

    // {
    //   title: (
    //     <HeaderCell title={<span className="whitespace-nowrap">RCIRef</span>} />
    //   ),
    //   dataIndex: 'date',
    //   key: '',
    //   width: 250,
    //   render: (createdDate: Date) => <DateCell date={createdDate} />,
    // },

    // {
    //   title: <HeaderCell title="commodity" />,
    //   onHeaderCell: () => onHeaderCellClick('patient.name'),
    //   dataIndex: 'patient',
    //   key: 'patient',
    //   width: 250,
    //   render: (patient: { name: string; email: string }) => (
    //     <div>
    //       <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
    //         {patient.name}
    //       </Text>
    //       {patient.email && (
    //         <Text className="text-[13px] text-gray-500">{patient.email}</Text>
    //       )}
    //     </div>
    //   ),
    // },

    // {
    //   title: (
    //     <HeaderCell
    //       title={<span className="whitespace-nowrap">lab</span>}
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'type'
    //       }
    //     />
    //   ),
    //   dataIndex: 'type',
    //   key: 'type',
    //   width: 180,
    //   onHeaderCell: () => onHeaderCellClick('type'),
    //   render: (type: Type) => (
    //     <Text className="whitespace-nowrap font-medium text-gray-900">
    //       {type}
    //     </Text>
    //   ),
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
        customSize: '700px',
      });
  }
  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <Tooltip
        size="sm"
        content={'View Appointment'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'View Appointment'}
          className="hover:!border-gray-900 hover:text-gray-700"
          onClick={() =>
            openModal({
              view: (
                <JobcardDetails
                  data={row}
                  onDelete={() => onDeleteItem(row.id)}
                  onEdit={handleCreateModal}
                />
              ),
              customSize: '900px',
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
