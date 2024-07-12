'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea } from 'rizzui';
import {
  CreateUserInput,
  createUserSchema,
} from '@/utils/validators/create-user.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
  permissions,
  roles,
  statuses,
} from '@/app/shared/roles-permissions/utils';

// Define DisplayField component


export default function PermissionDetails({
  data,
  onDelete,
  onEdit,
}: {
  data?: any;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CreateUserInput> = (data) => {
    // set timeout only required to display loading state of the create category button
    const formattedData = {
      ...data,
      createdAt: new Date(),
    };
    setLoading(true);
    setTimeout(() => {
      console.log('formattedData', formattedData);
      setLoading(false);
      setReset({
        fullName: '',
        email: '',
        role: '',
        permissions: '',
        status: '',
      });
      closeModal();
    }, 600);
  };

  return (
    <Form<CreateUserInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createUserSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Permission details
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <div className="flex col-span-full flex-wrap gap-4">
              <Input
                label="Route Name"
                value={watch('fullName')}
                readOnly
              />
              <Input
                label="Page Name"
                value={watch('email')}
                readOnly
              />
            </div>
            <Input
              label="Status"
              value={statuses.find(option => option.value === watch('status'))?.label || ''}
              readOnly
            />
            <Input
              label="Actions"
              value={permissions.find(option => option.value === watch('permissions'))?.label || ''}
              readOnly
            />
            <Input
              label="Search keywords"
              value={watch('email')}
              readOnly
            />
            <div className="col-span-full flex items-center justify-end gap-4">
            <Button
            variant="solid"
            className="min-w-[80px]"
            onClick={(e) => (onDelete(), closeModal())}
          >
            Delete
          </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
