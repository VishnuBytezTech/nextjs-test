import UploadZone from '@/components/ui/file-upload/upload-zone';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';


import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

interface ProductMediaProps {
  className?: string;
}

// this one need to add from api through redux
const typeOption = [
    {
      value: 'active',
      label: 'Active',
    },
    {
      value: 'inactive',
      label: 'Inactive',
    },
  ];
////////////////////////

export default function SupervisorInput({ className }: ProductMediaProps) {
    const {
        register,
        control,
        formState: { errors },
      } = useFormContext();
  const { getValues, setValue } = useFormContext();

  return (
    <FormGroup
      title="Supervisor"
      description=""
      className={cn(className)}
    >

      {/* <Controller
        name="Status"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="!z-0"
            options={typeOption}
            value={value}
            onChange={onChange}
            label="status"
            className='col-span-full'
            error={errors?.type?.message as string}
            getOptionValue={(option) => option.value}
          />
        )}
      /> */}

      {/* <Controller
        name="client"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="!z-0"
            options={typeOption}
            value={value}
            onChange={onChange}
            label="Client"
            error={errors?.type?.message as string}
            getOptionValue={(option) => option.value}
          />
        )}
      /> */}
      {/* <Input
        label="Comments"
        type='text'
        className='col-span-full'
        {...register('title')}
        error={errors.title?.message as string}
      /> */}

        {/* <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Comments"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      /> */}

        {/*  Its required but for now its not need  */}

      {/* <UploadZone
        label='Image'
        className="col-span-full"
        name="productImages"
        getValues={getValues}
        setValue={setValue}
      /> */}
    </FormGroup>
  );
}
