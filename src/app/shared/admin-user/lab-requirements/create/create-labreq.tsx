import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { fetchCountryThunk } from '@/redux/features/country-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientThunk } from '@/redux/features/client-slice';
import toast from 'react-hot-toast';
import { createLabRequirementSchema } from '@/utils/validators/adminpanel/lab-requirement/create-lab-requirement-schema';
import { object } from 'zod';
import { createLabRequirementThunk } from '@/redux/features/lab-requirement-slice';

type CreateLabRequirementInput = {
  id: string;
  name: string;
};


export default function CreateLabRequirement() {
  const { closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const authToken = localStorage.getItem('accessToken');

  const methods = useForm<CreateLabRequirementInput>({
    resolver: zodResolver(createLabRequirementSchema),
    defaultValues: {
      name: '',

    },
  });

  const onSubmit: SubmitHandler<CreateLabRequirementInput> = (data) => {
    const labRequirementData = { ...data };
    console.log("lab requirement data ::", labRequirementData)
    const accessToken = authToken;
    dispatch(createLabRequirementThunk({ labRequirementData, accessToken:accessToken as string }))
      .unwrap()
      .then((response: any) => {
        setLoading(true);
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);
        if (response.status === 201) {
          // Successful creation
          setLoading(false);
          methods.reset();
          closeModal();
          toast.success(
            <Text as="b">Client successfully created</Text>
          );
        } else if (response.status === 400) {
          // Bad Request
          toast.error(
            <Text as="b">Client already present</Text>
          );
          setLoading(false);
        } else if (response.status === 401) {
          // Unauthorized
          toast.error(
            <Text as="b">Client already present</Text>
          );
          setLoading(false);
        } else {
          // Handle other status codes
          toast.error(
            <Text as="b">Client already present</Text>
          );
          setLoading(false);
        }
      })
      .catch((error : any) => {
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
          Add new Lab requirement
        </Title>
        <ActionIcon size="sm" variant="text" onClick={closeModal}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <div className="flex col-span-full flex-wrap gap-4">
        <Input
          label="Name"
          placeholder="Enter lab requirement name"
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
          Create Lab requirement
        </Button>
      </div>
    </form>
  );
}
