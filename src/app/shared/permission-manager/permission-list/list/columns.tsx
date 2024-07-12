'use client';

import Link from 'next/link';
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
import { FiDelete } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';
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
import PermissionDetails from './permission-details';

import EditPermission from '../../permission-form/edit-permission';


import { UseSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import { deletePermission } from '@/redux/features/permission-slice';




// const statusOptions = [
//   { label: 'Active', value: 'active' },
//   { label: 'Inactive', value: 'inactive' },
// ];

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
      title: (
        <div className="ps-3.5">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
            checked={checkedItems.length === data.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 30,
      render: (_: any, row: any) => (
        <div className="inline-flex ps-3.5">
          <Checkbox
            aria-label={'ID'}
            className="cursor-pointer"
            checked={checkedItems.includes(row.id)}
            {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="id" />,
      onHeaderCell: () => onHeaderCellClick('id'),
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id: string) => <Text>{id}</Text>,
    },
    {
      title: <HeaderCell title="route name" />,
      onHeaderCell: () => onHeaderCellClick('id'),
      dataIndex: 'routeName',
      key: 'routeName',
      width: 100,
      render: (id: string) => <Text>{id}</Text>,
    },
    {
      title: <HeaderCell title="page name" />,
      onHeaderCell: () => onHeaderCellClick('id'),
      dataIndex: 'pageName',
      key: 'pageName',
      width: 100,

      render: (id: string) => <Text>{id}</Text>,
    },

    {
      title: (
        <HeaderCell
          title="Status"
        />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 50, 
      onHeaderCell: () => onHeaderCellClick('status'),
      render: (status: boolean) => {
        const color = status === true ? 'red' : 'green';
        return <span style={{ color }}>{status}</span>;
      },
    },
    
    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 40,
      render: (_: string, row: any) => (
        <RenderAction row={row} onDeleteItem={onDeleteItem} />
      ),
    },
  ];
};

// function StatusSelect({ selectItem }: { selectItem?: string }) {
//   const selectItemValue = statusOptions.find(
//     (option) => option.label === selectItem
//   );
//   const [value, setValue] = useState(selectItemValue);
//   return (
//     <Select
//       dropdownClassName="!z-10"
//       inPortal={false}
//       placeholder="Select Role"
//       options={statusOptions}
//       value={value}
//       onChange={setValue}
//       displayValue={(option: { value: any }) =>
//         renderOptionDisplayValue(option.value as string)
//       }
//     />
//   );
// }

// function renderOptionDisplayValue(value: string) {
//   switch (value) {
//     case 'Scheduled':
//       return (
//         <div className="flex items-center">
//           <PiClockBold className="shrink-0 fill-green-dark text-base" />
//           <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
//             {value}
//           </Text>
//         </div>
//       );
//     default:
//       return (
//         <div className="flex items-center">
//           <PiCheckCircleBold className="shrink-0 fill-orange text-base" />
//           <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
//             {value}
//           </Text>
//         </div>
//       );
//   }
// }

// function handleCreateModal() {
//   closeModal(),
//     openModal({
//       view: <CreateUpdateAppointmentForm />,
//       customSize: '700px',
//     });
// }

function RenderAction({
  row,
  onDeleteItem,
}: {
  row: any;
  onDeleteItem: (id: string) => void;
}) {
  const { openModal, closeModal } = useModal();
  
  function handleEditPermission() {
    closeModal();
    openModal({
      view: <EditPermission permissionId={row.id} />,
      customSize: '700px',
    });
  }
  
  return (
<div className="flex items-center justify-end gap-3 pe-3">


<Tooltip
        size="sm"
        content={'Edit Product'}
        placement="top"
        color="invert"
      >
        <ActionIcon size="sm" variant="outline" aria-label={'Edit Permission'}>
          <PencilIcon
            onClick={() => openModal({
              view: <EditPermission permissionId={row.id} />,
              customSize: '900px',
            })}
            className="h-4 w-4"
          />
        </ActionIcon>
      </Tooltip>
    
    <Tooltip
      size="sm"
      content={'Delete prermission'}
      placement="top"
      color="invert"
      >
      <ActionIcon size="sm" variant="outline" aria-label={'Edit Permission'}>
        <MdDeleteForever 
              title={`Delete the Permission`}
              // description={`Are you sure you want to delete this ${row.id} Permission?`}
              onClick={() =>
                console.log("the permission id ::::::",row.id)
                
              }
              className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>


  {/* <DeletePopover
    title={`Delete the Permission`}
    description={`Are you sure you want to delete this ${row.id} Permission?`}
    onDelete={() => deletePermission(row.id)}
    /> */}


    
</div>

  );
}
