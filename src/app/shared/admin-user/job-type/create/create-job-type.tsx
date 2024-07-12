import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { createJobTypeThunk } from '@/redux/features/job-type-slice';
import {  createJobTypeSchema } from '@/utils/validators/adminpanel/jobTypes/create-job-type-schema';

type CreateJobTypeInput ={
  id: string,
  name: string
}

export default function CreateJobCard() {
  const { closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const authToken = localStorage.getItem('accessToken');



  const methods = useForm<CreateJobTypeInput>({
    resolver: zodResolver(createJobTypeSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<CreateJobTypeInput> = (data) => {
    const jobTypeData = { ...data };
    const accessToken = authToken;

    dispatch(createJobTypeThunk({ jobTypeData, accessToken: accessToken as string }))
      .unwrap()
      .then((response) => {
        setLoading(true);
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);
        if (response.status === 201) {
          // Successful creation
          setLoading(false);
          methods.reset();
          closeModal();
          toast.success(
            <Text as="b">Jobtype successfully created</Text>
          );
        } else if (response.status === 400) {
          // Bad Request
          toast.error(
            <Text as="b">Jobtype already present</Text>
          );
          setLoading(false);
        } else if (response.status === 401) {
          // Unauthorized
          toast.error(
            <Text as="b">Unauthorized</Text>
          );
          setLoading(false);
        } else {
          // Handle other status codes
          toast.error(
            <Text as="b">Error found</Text>
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          <Text as="b">An error occured</Text>
        );
      });
  };
  
  
  

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900">
      <div className="col-span-full flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Add Job type
        </Title>
        <ActionIcon size="sm" variant="text" onClick={closeModal}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <div className="flex col-span-full flex-wrap gap-4">
        <Input
          label="Name"
          placeholder="Enter job type name"
          className="flex-1"
          {...methods.register('name')}
          error={methods.formState.errors?.name?.message as string}
        />

        {/* <Input
          label="Phone number"
          type="number"
          placeholder="Enter phone number"
          className="flex-1"
          {...methods.register('phone')}
          error={methods.formState.errors?.phone?.message as string}
        /> */}


      </div>


      <div className="flex col-span-full flex-wrap gap-4">

        {/* <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          className="flex-1"
          {...methods.register('email')}
          error={methods.formState.errors?.email?.message as string}
        /> */}


        {/* <Controller
          control={methods.control}
          name="country"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Country"
              inPortal={false}
              labelClassName="font-medium text-gray-900 dark:text-white"
              dropdownClassName="p-2 gap-1 grid !z-[10]"
              value={countries.results ? countries.results.find(country => country.id === value) : null}
              onChange={(option) => onChange(option?.value)}
              options={countries.results ? countries.results.map(country => ({
                label: country.name,
                value: country.id
              })) : []}
              error={methods.formState.errors?.country?.message as string}
            />
          )}
        /> */}


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
          Create Job type
        </Button>
      </div>
    </form>
  );
}
