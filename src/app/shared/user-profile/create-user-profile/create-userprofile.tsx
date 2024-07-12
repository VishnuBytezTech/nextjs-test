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

type CreateUserProfile = {
    bio : string;
    commodity: string;
    city: string;
    birthday: Date;
}

const Commodities = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'feamle',
    },
  ];


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

export default function CreateUserProfile() {
  const onSubmit: SubmitHandler<CreateUserProfile> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      data,
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
      <Form<CreateUserProfile>
        // validationSchema={personalInfoFormSchema}
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
                    title="Bio"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                    <Controller
                        control={control}
                        name="bio"
                        render={({ field: { onChange, value } }) => (
                        <QuillEditor
                            value={value}
                            onChange={onChange}
                            className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
                            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                        />
                        )}
                    />
                </FormGroup>

                <FormGroup
                    title="Email Address"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                    <Controller
                        control={control}
                        name="city"
                        render={({ field: { onChange, value } }) => (
                        <Input
                            className="col-span-full"
                            // prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
                            type="text"
                            value={value}
                            onChange={onChange}
                            placeholder="georgia.young@example.com"
                            // error={errors.email?.message}
                        />
                        )}
                    />
                </FormGroup>


                <FormGroup
                    title="Date"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                    <Controller
                        control={control}
                        name="birthday"
                        render={({ field: { onChange, value } }) => (
                        <Input
                            className="col-span-full"
                            type="date"
                            value={value ? new Date(value).toISOString().split('T')[0] : ''}
                            onChange={onChange}
                            // error={errors.date?.message}
                        />
                        )}
                    />
                </FormGroup>

              <FormGroup
                title="Role"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                <Controller
                    name="commodity"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                    <Select
                        options={Commodities ? Commodities.map(Commodity => ({
                        label: Commodity.label,
                        value: Commodity.value
                        })) : []}
                        value={value}
                        onChange={onChange}
                        label="Commodity"
        
                    />
                    )}
                    />
              </FormGroup>


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
