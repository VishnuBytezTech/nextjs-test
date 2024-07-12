import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';


import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { fetchAllClientsThunk, fetchClientsThunk } from '@/redux/features/client-slice';
import ReactDatePicker from 'react-datepicker';
import { fetchCommodityList } from '@/api/commodity/commodityApi';
import commoditySlice, { fetchAllCommoditiesThunk, fetchCommoditiesThunk } from '@/redux/features/commodity-slice';
import { fetchCountryThunk } from '@/redux/features/country-slice';
import { fetchAllJobTypesThunk } from '@/redux/features/job-type-slice';


const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

interface GeneralDetailsProps {
  className?: string;
}

// client api state
interface ClientState {
  name: string;
  email: string;
  phone: string;
  country: string;
}

export default function GeneralDetails({ className }: GeneralDetailsProps) {

  const dispatch = useDispatch<AppDispatch>();
  const authToken = localStorage.getItem('accessToken');

  // Client redux values ;;;
  const clients = useSelector(
    (state: RootState) => state.clientreducer.clients
  )
  console.log("All clients data :::::::", clients)
  const clientStatus = useSelector(
    (state: RootState) => state.permissionReducer.status
  );
  const clientError = useSelector(
    (state: RootState) => state.permissionReducer.error
  );


  // Commodity Rdux values;;
  const Commodities = useSelector(
    (state: RootState) => state.commodityreducer.commodities
  )

  console.log("commoditiess ::::::::::::::::::", Commodities)

  // country redux values ;;
  const countires = useSelector(
    (state: RootState) => state.countryreducer.countries
  )

  // jobtype redux values ;;
  const jobtypes = useSelector(
    (state: RootState) => state.jobtypereducer.jobTypes
  )





  useEffect(() =>{

    dispatch(fetchAllCommoditiesThunk({authToken: authToken as string}))

    dispatch(fetchCountryThunk())

    dispatch(fetchAllJobTypesThunk({authToken: authToken as string}))

    dispatch(fetchAllClientsThunk({authToken: authToken as string}))
    
  
  }, [])


  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
<FormGroup
  title="General"
  description="Add your details about the jobcard"
  className={cn(className)}
>
  <Controller
    name="client"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Select
        options={clients ? clients.map(client => ({
          label: client.name,
          // value: client.name
          value: client.id || ''
        })) : []}
        value={value}
        onChange={onChange}
        label="Client"
        error={errors?.client?.message as string}
      />
    )}
  />

  <Controller
    name="client_ref"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Input
        placeholder='Enter Client ref'
        value={value}
        onChange={onChange}
        label="Client ref"
        error={errors?.clientRef?.message as string}
      />
    )}
  />

  <Controller
    name="commodity"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Select
        options={Commodities ? Commodities.map(Commodity => ({
          label: Commodity.name,
          value: Commodity.id
        })) : []}
        value={value}
        onChange={onChange}
        label="Commodity"
        error={errors?.clientRef?.message as string}
      />
    )}
  />

  <Controller
    name="country"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Select
        options={countires ? countires.map(country => ({
          label: country.name,
          value: country.id
        })) : []}
        value={value}
        onChange={onChange}
        label="Country"
      />
    )}
  />

  <Controller
    name="address"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Input
        placeholder='Enter address'
        value={value}
        onChange={onChange}
        label="Address"
        error={errors?.address?.message as string}
      />
    )}
  />

  <Controller
    name="city"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Input
        placeholder='Enter City'
        value={value}
        onChange={onChange}
        label="City"
        error={errors?.city?.message as string}
      />
    )}
  />

  <Controller
    name="job_type"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Select
        options={jobtypes ? jobtypes.map(jobtype => ({
          label: jobtype.name,
          value: jobtype.id
          
        })) : []}
        value={value}
        onChange={onChange}
        label="Job Type"
      />
    )}
  />

<Controller
  name="status"
  control={control}
  render={({ field: { onChange, value } }) => (
    <Select
      options={[
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ]}
      value={value}
      onChange={onChange}
      label="Status"
    />
  )}
/>


  <Controller
    control={control}
    name="description"
    render={({ field: { onChange, value } }) => (
      <QuillEditor
        value={value}
        onChange={onChange}
        label="Description"
        className="col-span-full [&_.ql-editor]:min-h-[100px]"
          labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
      />
    )}
  />


{/* Need to work on the validation */}
{/* Need to work on the validation */}
{/* Need to work on the validation */}
{/* Need to work on the validation */}

{/* <Controller
        name="client"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={clients.results ? clients.results.map(client => ({
              label: client.name,
              value: client.id
            })) : []}
            value={value}
            onChange={(selectedOption) => onChange(selectedOption.value)} // Set form value with option value
            label={value ? clients.results.find(client => client.id === value)?.name : "Client"} // Display selected option name or default label
            error={errors?.client?.message as string}
          />
        )}
      />

<Controller
  name="commodity"
  control={control}
  render={({ field: { onChange, value } }) => (
    <Select
      options={Commodities.results ? Commodities.results.map(commodity => ({
        label: commodity.name,
        value: commodity.id
      })) : []}
      value={value}
      onChange={(selectedOption) => onChange(selectedOption.value)}
      label={value ? Commodities.results.find(commodity => commodity.id === value)?.name : "Commodity"}
      error={errors?.clientRef?.message as string}
    />
  )}
/>

<Controller
  name="country"
  control={control}
  render={({ field: { onChange, value } }) => (
    <Select
      options={countires.results ? countires.results.map(country => ({
        label: country.name,
        value: country.id
      })) : []}
      value={value}
      onChange={(selectedOption) => onChange(selectedOption.value)}
      label={value ? countires.results.find(country => country.id === value)?.name : "Country"}
    />
  )}
/>

<Controller
  name="job_type"
  control={control}
  render={({ field: { onChange, value } }) => (
    <Select
      options={jobtypes.results ? jobtypes.results.map(jobtype => ({
        label: jobtype.name,
        value: jobtype.id
      })) : []}
      value={value}
      onChange={(selectedOption) => onChange(selectedOption.value)}
      label={value ? jobtypes.results.find(jobtype => jobtype.id === value)?.name : "job_type"}
    />
  )}
/>



  <Controller
    name="client_ref"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Input
        placeholder='Enter Client ref'
        value={value}
        onChange={onChange}
        label="Client ref"
        error={errors?.clientRef?.message as string}
      />
    )}
  />




  <Controller
    name="address"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Input
        placeholder='Enter address'
        value={value}
        onChange={onChange}
        label="Address"
        error={errors?.address?.message as string}
      />
    )}
  />

  <Controller
    name="city"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Input
        placeholder='Enter City'
        value={value}
        onChange={onChange}
        label="City"
        error={errors?.city?.message as string}
      />
    )}
  /> */}

{/* Need to work on the validation */}
{/* Need to work on the validation */}
{/* Need to work on the validation */}
{/* Need to work on the validation */}






  {/* <Controller
    name="start_date"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Input
        label="Start Date"
        type="date"
        value={value}
        onChange={onChange}
        error={errors?.startDate?.message as string}
      />
    )}
  />

  <Controller
    name="end_date"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Input
        label="End Date"
        type="date"
        value={value}
        onChange={onChange}
        error={errors?.endDate?.message as string}
      />
    )}
  /> */}

</FormGroup>

  );
}
