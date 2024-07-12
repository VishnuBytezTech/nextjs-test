import React, { useEffect } from 'react';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { Controller, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPrepLabRequirementsThunk } from '@/redux/features/prep-lab-requirement-slice';
import { AppDispatch, RootState } from '@/redux/store';
import Select from 'react-select'; // Import react-select
import QuillLoader from '@/components/loader/quill-loader';

type ProductMediaProps = {
  className?: string;
};

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

const PerplabInput: React.FC<ProductMediaProps> = ({ className }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const dispatch = useDispatch<AppDispatch>();
  const authToken = localStorage.getItem('accessToken');

  const prepLabRequirements = useSelector(
    (state: RootState) => state.preplabrequirementreducer.prepLabRequirements
  );

  useEffect(() => {
    if (authToken) {
      dispatch(fetchAllPrepLabRequirementsThunk({ authToken: authToken as string }));
    }
  }, [authToken, dispatch]);

  return (
    <FormGroup title="Preplab" description="" className={cn(className)}>
      <p>Prep Lab Requirement</p>
      <Controller
        name="prep_lab_requirement"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={prepLabRequirements
              ? prepLabRequirements.map((prepLabReq) => ({
                  label: prepLabReq.name,
                  value: prepLabReq.id,
                }))
              : []}
            value={value}
            onChange={onChange}
            // label="Prep Lab Requirement"
            className="col-span-full"
            isMulti // Assuming single selection based on code 1 example
            styles={{ container: (base) => ({ ...base, width: '100%' }) }}
          />
        )}
      />

      {/* Example of using QuillEditor */}
      <Controller
        control={control}
        name="comments"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Comments"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />
    </FormGroup>
  );
};

export default PerplabInput;
