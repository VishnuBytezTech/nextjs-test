'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea  } from 'rizzui';
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

export default function CreateJobcard() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CreateUserInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    const formattedData = {
      ...data,
      createdAt: new Date(),
    };
    setLoading(true);
    setTimeout(() => {
      console.log('formattedData', formattedData);
      setLoading(false);
      setReset({
        routeName: '',
        pageName: '',
        permissions: '',
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
                Add new Jobcard
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <div className="flex col-span-full gap-4">
                <Input
                    label="Job title"
                    placeholder="Enter route name"
                    className="flex-1"
                />
                <Select
                    options={[
                    { value: 'lab-1', label: 'lab-1' },
                    { value: 'lab-2', label: 'lab-2' },
                    ]}
                    label="Lab"
                    getOptionValue={(option) => option.value}
                    dropdownClassName="!z-[1]"
                    className="flex-1"
                    inPortal={false}
                />
                </div>


            <div className="flex col-span-full gap-4">
                <Select
                options={[
                    { value: 'Commodity-1', label: 'Commodity-1' },
                    { value: 'Commodity-2', label: 'Commodity-2' },
                ]}
                //   value={formData.status === true ? 'Active' : 'Inactive'}
                //   onChange={(selected) => {
                //     setFormData({ ...formData, status: selected === 'true' });
                //   }}
                label="commodity"
                getOptionValue={(option) => option.value}
                dropdownClassName="!z-[1]"
                className="col-span-6"
                inPortal={false}
                />
                <Select
                options={[
                    { value: 'Jobtype-1', label: 'Jobtype-1' },
                    { value: 'Jobtype-2', label: 'Jobtype-2' },
                ]}
                //   value={formData.status === true ? 'Active' : 'Inactive'}
                //   onChange={(selected) => {
                //     setFormData({ ...formData, status: selected === 'true' });
                //   }}
                label="Job Type"
                getOptionValue={(option) => option.value}
                dropdownClassName="!z-[1]"
                className="col-span-6"
                inPortal={false}
                />

            </div>

            <div className="flex col-span-full flex-wrap gap-4">
                <Textarea
                    label="Description"
                    placeholder="Enter description"
                    className="flex-1 line-clamp-2"
                    
                />
            </div>


            <div className="col-span-full flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={closeModal}
                className="w-full @xl:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                Create Permission
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
