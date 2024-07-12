import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import { CreateClientInput, createClientSchema } from '@/utils/validators/adminpanel/clients/create-client.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import commoditySlice, { createCommodityThunk } from '@/redux/features/commodity-slice';
import { CreateJobTypeInput, createJobTypeSchema } from '@/utils/validators/adminpanel/jobTypes/create-job-type-schema';
import { createCommiditySchema } from '@/utils/validators/adminpanel/commodity/create-commodity-schema';
import { AppDispatch } from '@/redux/store';

type CreateCommodityInput = {
  id : string, 
  name: string
}

type Commodity = {

  name: string;
  // Add other properties as needed
};


export default function CreateCommodity() {
  const { closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const accessToken = localStorage.getItem('accessToken');


  

  const methods = useForm<CreateCommodityInput>({
    resolver: zodResolver(createCommiditySchema),
    defaultValues: {
      name: '',

    },
  });

  const onSubmit: SubmitHandler<CreateCommodityInput> = (data) => {
    const commodityData: Commodity = { ...data };
    console.log("comodity create submit is working ::", commodityData)

    dispatch(createCommodityThunk({ commodityData: commodityData as CreateCommodityInput, accessToken: accessToken as string }))
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
          Add new Commodity
        </Title>
        <ActionIcon size="sm" variant="text" onClick={closeModal}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <div className="flex col-span-full flex-wrap gap-4">
        <Input
          label="Name"
          placeholder="Enter client name"
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
          Create Commodity
        </Button>
      </div>
    </form>
  );
}
