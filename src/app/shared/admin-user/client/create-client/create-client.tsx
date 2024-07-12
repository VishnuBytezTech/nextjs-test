import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import {
  CreateClientInput,
  createClientSchema,
} from '@/utils/validators/adminpanel/clients/create-client.schema';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { fetchCountryThunk } from '@/redux/features/country-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hook';
import { RootState } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientThunk } from '@/redux/features/client-slice';
import toast from 'react-hot-toast';


export default function CreateClient() {
  const { closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);

  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const authToken = localStorage.getItem('accessToken');
  const countries = useAppSelector(
    (state: RootState) => state.countryreducer.countries
  );
  useEffect(() => {
    console.log(
      'Countries list from sdflkjsaldfksjdflskdjfl ::::::::',
      countries
    );
  }, [countries]);

  useEffect(() => {
    dispatch(fetchCountryThunk());
  }, []);

  const methods = useForm<CreateClientInput>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: { id: '', iso: '', name: '' },
    },
  });

  const onSubmit: SubmitHandler<CreateClientInput> = (data) => {
    const oldClientData = { ...data };
    const clientData = {
      ...oldClientData,
      country: oldClientData.country.id,
    };
    const accessToken = authToken;
    if (!accessToken) {
      console.error('No access token available');
      return; // Exit if there is no access token
    }
    dispatch(createClientThunk({ clientData, accessToken }))
      .unwrap()
      .then((response: any) => {
        setLoading(true);
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
        if (response.status === 201) {
          // Successful creation
          setLoading(false);
          methods.reset();
          closeModal();
          toast.success(<Text as="b">Client successfully created</Text>);
        } else if (response.status === 400) {
          // Bad Request
          toast.error(<Text as="b">Client already present</Text>);
          setLoading(false);
        } else if (response.status === 401) {
          // Unauthorized
          toast.error(<Text as="b">Client already present</Text>);
          setLoading(false);
        } else {
          // Handle other status codes
          toast.error(<Text as="b">Client already present</Text>);
          setLoading(false);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(<Text as="b">An error occured</Text>);
      });
  };

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      <div className="col-span-full flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Add new Client
        </Title>
        <ActionIcon size="sm" variant="text" onClick={closeModal}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <div className="col-span-full flex flex-wrap gap-4">
        <Input
          label="Name"
          placeholder="Enter client name"
          className="flex-1"
          {...methods.register('name')}
          error={methods.formState.errors?.name?.message as string}
        />
        <Input
          label="Phone number"
          type="number"
          placeholder="Enter phone number"
          className="flex-1"
          {...methods.register('phone')}
          error={methods.formState.errors?.phone?.message as string}
        />
      </div>
      <div className="col-span-full flex flex-wrap gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          className="flex-1"
          {...methods.register('email')}
          error={methods.formState.errors?.email?.message as string}
        />
        <Controller
          control={methods.control}
          name="country"
          render={({ field: { value, onChange } }) => (
            <Select
              label="Country"
              inPortal={false}
              labelClassName="font-medium text-gray-900 dark:text-white"
              dropdownClassName="p-2 gap-1 grid !z-[10]"
              value={
                countries
                  ? countries.find((country) => country.id === value?.id)
                  : null
              }
              onChange={(option: any) => {
                console.log('Option:', option);
                onChange(
                  countries.find((country) => country.id === option.value)
                )}
              }
              options={
                countries
                  ? countries.map((country) => ({
                      label: country.name,
                      value: country.id,
                    }))
                  : []
              }
              error={methods.formState.errors?.country?.message as string}
            />
          )}
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
          Create Client
        </Button>
      </div>
    </form>
  );
}
