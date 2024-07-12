'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Loader, Text, Input, Button } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@/components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';

import { FaRegUser  } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { WiTime9 } from "react-icons/wi";


import { MdOutlineEdit } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";



const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

export default function UserPersonalInfoView() {
  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  const [editName, setEditName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [editCountry, setEditCountry] = useState(false)

  const handleNameEdit = () => {
    setEditName((prevEditName) => !prevEditName);
  };

  const handleEmailEdit = () => {
    setEditEmail((prevEditEmail) => !prevEditEmail);
  };

  const handleEditCountry = () => {
    setEditCountry((prevEditCountry) => !prevEditCountry);
  };

  return (
    <>
      <Form<PersonalInfoFormTypes>
        validationSchema={personalInfoFormSchema}
        // resetValues={reset}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: 'onChange',
          defaultValues,
        }}
      >
        {({ register, control, setValue, getValues, formState: { errors } }) => {
          return (
            <>
              <FormGroup
                title="Personal Info"
                description="Update your photo and personal details here"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              />
              {/* User first name and last name */}
              <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                <FormGroup
                  title="Name"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                    <Input
                      placeholder="First Name"
                      readOnly
                      className="flex-grow"
                    />
                  <div className="flex items-center w-full px-2">
                    <Input
                      placeholder="Last Name"
                      readOnly
                      className="flex-grow"
                    />
                </div>


              </FormGroup>




                <FormGroup
                  title="Email"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    className="col-span-full"
                    readOnly
                    // prefix={
                    //   <TfiWorld className="h-6 w-6 text-gray-500" />
                    // }
                    type="text"
                    placeholder="Email is not added"
                    // {...register('email')}
                  />
                </FormGroup>

                <FormGroup
                  title="Role"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    className="col-span-full"
                    readOnly
                    // prefix={
                    //   <TfiWorld className="h-6 w-6 text-gray-500" />
                    // }
                    type="text"
                    placeholder="User role is not added"
                    // {...register('email')}
                  />
                </FormGroup>



                <FormGroup
                  title="Country"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    className="col-span-full"
                    readOnly
                    // prefix={
                    //   <TfiWorld className="h-6 w-6 text-gray-500" />
                    // }
                    type="text"
                    placeholder="Country is not added yet"
                    // {...register('email')}
                  />
                </FormGroup>


                <FormGroup
                  title="Timezone"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    className="col-span-full"
                    readOnly
                    // prefix={
                    //   <TfiWorld className="h-6 w-6 text-gray-500" />
                    // }
                    type="text"
                    placeholder="Timezone is not added yet"
                    // {...register('email')}
                  />
                </FormGroup>


                <FormGroup
                  title="Bio"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    className="col-span-full"
                    // prefix={
                    //   <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                    // }
                    type="text"
                    
                    placeholder="User role"
                    readOnly
                    // {...register('email')}

                  />
                </FormGroup>

              </div>

              <FormFooter
                // isLoading={isLoading}
                altBtnText="Cancel"
                submitBtnText="Edit"
              />
            </>
          );
        }}
      </Form>
    </>
  );
}
