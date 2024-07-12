import React, { useEffect } from 'react';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { Controller, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLabRequirementsThunk } from '@/redux/features/lab-requirement-slice';
import { AppDispatch, RootState } from '@/redux/store';
import Select from 'react-select'; // Import react-select

type LabInputProps = {
  className: string;
};

const LabInput: React.FC<LabInputProps> = ({ className }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const dispatch = useDispatch<AppDispatch>();
  const authToken = localStorage.getItem('accessToken');

  const labRequirements = useSelector(
    (state: RootState) => state.labrequirementreducer.labRequirements
  );

  useEffect(() => {
    if (authToken) {
      dispatch(fetchAllLabRequirementsThunk({ authToken: authToken as string }));
    }
  }, [authToken, dispatch]);

  return (
    <FormGroup title="Lab" description="" className={cn(className)}>
      <p>Lab Requirement</p>
      <Controller
        name="lab_requirement"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={labRequirements ? labRequirements.map((labReq) => ({
              label: labReq.name,
              value: labReq.id
            })) : []}
            value={value} // Ensure value is an array if multiple selections are allowed
            onChange={onChange} // onChange should handle array of selected values
            // label="Lab Requirement"
            className='col-span-full'
            isMulti // Enable multiple selection
            styles={{ container: (base) => ({ ...base, width: '100%' }) }}
          />
        )}
      />
      <div className='bg-transparent w-full h-32'></div>
    </FormGroup>
  );
};

export default LabInput;
