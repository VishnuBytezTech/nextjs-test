import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import {  createJobTypeSchema } from '@/utils/validators/adminpanel/jobTypes/create-job-type-schema';
import { sendUserInvitation } from '@/redux/features/user-invitation-slice';

interface RoleOption {
  value: string; // Assuming value is a string, adjust type as per your data structure
  label: string; // Example label property
  // Add other properties as needed
}


type CreateJobTypeInput = {
  name: string;
};

export default function InviteUser() {
  const { closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const authToken = localStorage.getItem('accessToken');

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'prep_lab', label: 'Prep Lab' },
    { value: 'lab', label: 'Lab' },
    { value: 'finance', label: 'Finance' },
  ];


  

  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);

  const handleRoleChange = (selectedOption: RoleOption) => {
    setSelectedRole(selectedOption);
    console.log("selected role :::::::::::", selectedRole)
  };

  const methods = useForm<CreateJobTypeInput>({
    resolver: zodResolver(createJobTypeSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<CreateJobTypeInput> = (data) => {
    if (!selectedRole) {
      toast.error(
        <Text as="b">Please select a role</Text>
      );
      return;
    }

    const email = data.name; 
    const role = selectedRole.value;
    console.log("user email :::", email, "user role ::::", role, "AuhtToken :::", authToken)

    dispatch(sendUserInvitation({ authToken:authToken as string, email, role }))
      .unwrap()
      .then((response) => {
        setLoading(true);
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);
        if (response.status === 201) {
          setLoading(false);
          closeModal();
          toast.success(
            <Text as="b">User invitation successfully sent</Text>
          );
          methods.reset();
        } else if (response.status === 400) {
          // Bad Request
          toast.error(
            <Text as="b">User invitation already sent</Text>
          );
          setLoading(false);
        } else if (response.status === 401) {
          // Unauthorized
          toast.error(
            <Text as="b">Unauthorized</Text>
          );
          setLoading(false);
        } else {
          
          toast.error(
            <Text as="b">Error found</Text>
          );
          setLoading(false);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(
          <Text as="b">An error occurred</Text>
        );
      });
  };

  return (
    
    <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900">
      
      <div className="col-span-full flex items-center justify-between">
        {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 z-50">
              <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" />
            </div>
        )}

        <Title as="h4" className="font-semibold">
          Invite User
        </Title>
        <ActionIcon size="sm" variant="text" onClick={closeModal}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <div className="flex col-span-full flex-wrap gap-4">
        <Input
          label="Email"
          placeholder="Enter user email"
          type='email'
          className="flex-1"
          {...methods.register('name')}
          error={methods.formState.errors?.name?.message as string}
        />
      </div>
      <div className="flex col-span-full flex-wrap gap-4">
        <Select
          label="Role"
          inPortal={false}
          labelClassName="font-medium text-gray-900 dark:text-white"
          dropdownClassName="p-2 gap-1 grid !z-[10]"
          value={selectedRole}
          onChange={handleRoleChange}
          options={roleOptions}
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
          Send Invitation
        </Button>
      </div>
    </form>
  );
}
