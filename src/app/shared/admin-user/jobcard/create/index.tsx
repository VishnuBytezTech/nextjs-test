"use client"
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';

import GeneralDetails from '@/app/shared/admin-user/jobcard/create/general-details';
import SupervisorInput from '@/app/shared/admin-user/jobcard/create/supervisor';
import PreplabInput from '@/app/shared/admin-user/jobcard/create/preplab';
import LabInput from '@/app/shared/admin-user/jobcard/create/lab';
import FormNav from '@/app/shared/admin-user/jobcard/create/form-nav';
import {
    formParts,
    menuItems
} from '@/app/shared/admin-user/jobcard/create/form-nav';
import { 
  jobcardFormSchema,
  createJobcardInput
} from '@/utils/validators/adminpanel/jobcard/create-jobcard.schema';
import FormFooter from '@/components/form-footer';

import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { createJobcardThunk } from '@/redux/features/jobcard-slice';
import { useRouter } from 'next/navigation';
import { list } from 'postcss';

const MAP_STEP_TO_COMPONENT = {
  [formParts.general]: GeneralDetails,
  [formParts.supervisor]: SupervisorInput,
  [formParts.prepLab]: PreplabInput,
  [formParts.lab]: LabInput,
};

interface IndexProps {
  slug?: string;
  className?: string;
  jobcard?: createJobcardInput;
}

export default function CreateJobCard({ slug, jobcard, className }: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>();
  const [generalForm, setGeneralFrom] = useState({
    client: '',
    description: '',
    commodity: '',
    job_type: '',
    clientRef: '',
    start_date: new Date(),
    end_date: new Date(),
    country: '',

    // Need to setup
    address: '',
    city: '',
    supervisor: '',
    prep_lab_user: '',
    lab_user: ''
  });

  const [supervisorForm, setSupervisorForm] = useState({
    description: '',
    status: '',
    comment: ''
  });

  const methods = useForm<createJobcardInput>();

  // const methods = useForm<createJobcardInput>({
  //   resolver: zodResolver(jobcardFormSchema),
  // });

  interface Jobcard {
    description: string;
    clientRef: string;
    start_date: Date;
    end_date: Date;
    client: string;
    commodity: string;
    job_type: string;
    country: string;
    address: string;
    city: string;
    lab_requirements: string;
    prep_lab_requirements: string;

    startDate: Date;
    endDate: Date;
    // Other properties...
}

  const {handleSubmit, formState } = methods;
  console.log(formState.errors)

  const onSubmit = (data: any) =>{
    console.log("Form data:::>>>", data)
    console.log("Form data:::>>>", data)
    const clientId = data.client ? data.client.value : null;
    const commodityId = data.commodity ? data.commodity.value : null;
    const countryId = data.country ? data.country.value : null;
    const jobTypeId = data.job_type ? data.job_type.value : null;
    const description = data.description ? data.description.slice(3, -4)  : null ;
    const lab_requirement = data.lab_requirement ? data.lab_requirement.map((req : {value: string}) => req.value) : null
    const prep_lab_requirement = data.prep_lab_requirement ? data.prep_lab_requirement.map((req: { value: string }) => req.value) : null;


  
    const newJobCard: Jobcard = {
      client: clientId,
      description: description,
      commodity: commodityId,
      job_type: jobTypeId,
      country: countryId,
      address: data.address,
      city: data.city,
      startDate: data.start_date,
      endDate: data.end_date,
      clientRef: "",
      lab_requirements : lab_requirement,
      prep_lab_requirements: prep_lab_requirement,
 
      start_date: data.start_date,
      end_date: data.end_date,
    };
    console.log("Jobcard data ::::::::::::::::::::::::::::::::::::::")
    console.log("Jobcard data ::::::::::::::::::::::::::::::::::::::")
    console.log("new jobcard data :::", newJobCard)
    console.log("Jobcard data ::::::::::::::::::::::::::::::::::::::")
    console.log("Jobcard data ::::::::::::::::::::::::::::::::::::::")
    const accessToken = localStorage.getItem('accessToken');
    console.log("access token from idnex ::", accessToken)

    dispatch(createJobcardThunk({newJobCard, accessToken: accessToken as string}))
    .unwrap()
    .then((response: any) => {
      console.log("response status ::::::::", response.status)
      if (response.status === 201){
        toast.success(
          <Text as="b">Jobcard successfully created</Text>
        );
        router.push('/admin-dashboard/job-card-list')
      } else if (response.status === 400) {
        // Bad Request
        toast.error(<Text as="b">Bad request</Text>);
        console.log("Response from jobcard create ::::::::::::", response)
        setLoading(false);
      } else if (response.status === 401) {
        // Unauthorized
        toast.error(<Text as="b">Unauthorized ! You need to login to create jobcard</Text>);
        setLoading(false);
        console.log("Response from jobcard create ::::::::::::", response)

      } else {
        // Handle other status codes
        toast.error(<Text as="b">Error !</Text>);
        setLoading(false);
        console.log("Response from jobcard create ::::::::::::", response)
      }
    })
    .catch((error: any) => {
      setLoading(false);
      toast.error(<Text as="b">An error occured</Text>);
      console.log("Response from jobcard create ::::::::::::", error)

    });

  }


  ///Need to do validaion 
  ///Need to do validaion 
  ///Need to do validaion 
  ///Need to do validaion 

  // const onSubmit: SubmitHandler<createJobcardInput> = (data) =>{
  //   console.log("Form data:::>>>", data)
  //   const clientId = data.client ? data.client.value : null;
  //   const commodityId = data.commodity ? data.commodity.value : null;
  //   const countryId = data.country ? data.country.value : null;
  //   const jobTypeId = data.job_type ? data.job_type.value : null;
  
  //   const newJobCard = {
  //     // client: clientId,
  //     // description: "sample",
  //     // commodity: commodityId,
  //     // job_type: jobTypeId,
  //     // country: countryId,
  //     // address: data.address,
  //     // city: data.city,
  //  ...data
  //     // start_date: data.start_date,
  //     // end_date: data.end_date,
  //   };
  //   console.log("new jobcard data :::", newJobCard)
  //   const accessToken = localStorage.getItem('accessToken');
  //   console.log("access token from idnex ::", accessToken)

  //   dispatch(createJobcardThunk({newJobCard, accessToken}))
  // }


  ///Need to do validaion 
  ///Need to do validaion 
  ///Need to do validaion 
  ///Need to do validaion 

  // const methods = useForm<createJobcardInput>({
  //   resolver: zodResolver(productFormSchema),
  //   // defaultValues: defaultValues(jobcard),
  // });

  // const onSubmit: SubmitHandler<CreateProductInput> = (data) => {
  //   console.log("product submit function works :::::");
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     console.log('product_data', data);
  //     toast.success(<Text as="b">Jobcard successfully created</Text>);
  //     methods.reset();
  //   }, 600);
  // };


  return (
    <div className="@container">
      <FormNav className={cn(layout === LAYOUT_OPTIONS.BERYLLIUM && 'z-[999] 2xl:top-[72px]')} />

      <FormProvider {...methods}>

        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className={cn('relative z-[19] [&_label.block>span]:font-medium', className)}>
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => {
              return (
                <Element key={key} name={formParts[key as keyof typeof formParts]}>
                  <Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />
                </Element>
              );
            })}
          </div>

          <FormFooter isLoading={isLoading} submitBtnText={'Create Jobcard'} />
        </form>
      </FormProvider>
    </div>
  );
}
