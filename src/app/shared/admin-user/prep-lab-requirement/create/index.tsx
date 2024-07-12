import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import { CreateClientInput, createClientSchema } from '@/utils/validators/adminpanel/clients/create-client.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { fetchCountryThunk } from '@/redux/features/country-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientThunk } from '@/redux/features/client-slice';
import toast from 'react-hot-toast';
import { createPrepLabRequirementThunk } from '@/redux/features/prep-lab-requirement-slice';
import { createPrepLabRequirementSchema } from '@/utils/validators/adminpanel/prep-lab-requirement/create-prep-lab-requirement.schema';

type CreatePrepLabRequirementInput = {
  id : string
  name : string
}

export default function CreatePrepLabRequirement() {
  const { closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const authToken = localStorage.getItem('accessToken');


  useEffect(() => {
    dispatch(fetchCountryThunk());
  }, [dispatch]);

  const methods = useForm<CreatePrepLabRequirementInput>({
    resolver: zodResolver(createPrepLabRequirementSchema),
    defaultValues: {
      name: '',

    },
  });

  const onSubmit: SubmitHandler<CreatePrepLabRequirementInput> = (data) => {
    const prepLabRequirementData = { ...data };
    const accessToken = authToken;
    dispatch(createPrepLabRequirementThunk({ prepLabRequirementData, accessToken:accessToken as string }))
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
            <Text as="b">Prep lab requirement successfully created</Text>
          );
        } else if (response.status === 400) {
          // Bad Request
          toast.error(
            <Text as="b">Prep lab requirement already present</Text>
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
            <Text as="b">Unknown Error</Text>
          );
          setLoading(false);
        }
      })
      .catch((error: any) => {
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
          Add new prep lab requirement
        </Title>
        <ActionIcon size="sm" variant="text" onClick={closeModal}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <div className="flex col-span-full flex-wrap gap-4">
        <Input
          label="Name"
          placeholder="Enter prep lab requirement name"
          className="flex-1"
          {...methods.register('name')}
          error={methods.formState.errors?.name?.message as string}
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
          Create prep lab 
        </Button>
      </div>
    </form>
  );
}
