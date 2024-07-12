'use client';

import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import {  SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Textarea } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';

/////
import { editPermissionSchema } from '@/utils/validators/permissions/edit-permission.schema';
import { updatePermission } from '@/api/permissions/permissionApi';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchPermissionDetail } from '@/redux/features/permission-slice';
import { ThunkDispatch } from '@reduxjs/toolkit';



interface EditPermissionProps {
  permissionId: number;
}

interface PermissionInput {
  routeName: string;
  pageName: string;
  actions: string;
  status: boolean;
}

const EditPermission = ({ permissionId }: EditPermissionProps) => {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PermissionInput>({
    routeName: '',
    pageName: '',
    actions: '',
    status: false,
  });

  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();

  const permission = useSelector(
    (state: RootState) => state.permissionReducer.permissionDetail.permission
  );
  const status = useSelector(
    (state: RootState) => state.permissionReducer.permissionDetail.status
  );
  const error = useSelector(
    (state: RootState) => state.permissionReducer.permissionDetail.status
  );

  const [permissionstatus, setPermissionstatus] = useState();

  useEffect(() => {
    dispatch(fetchPermissionDetail(permissionId));
  }, [dispatch, permissionId]);

  console.log(permission, permissionId);
  useEffect(() => {
    if (permission) {
      setFormData({
        routeName: permission.routeName,
        pageName: permission.pageName,
        actions: permission.actions,
        status: permission.status,
      });
    }
  }, [permission]);

  const onSubmit: SubmitHandler<PermissionInput> = async(formData) => {
    // const [isLoading, setLoading] = useState(false);
    console.log("the submit is working :: Form data >>>::: ", formData)
    const formattedData = {
      ...formData,
      createdAt: new Date(),
    };
    console.log(formattedData);
    setLoading(true);
    // try{
    //   const updatedPermission = await updatePermission(permissionId, formattedData)
    //   console.log("api fetch data updation successfully completed !!!!!!!!!!!!!!!!!!!!!")
    // } catch (error) {
    //   console.error('Error updating permission:', error);
            
    // } finally {
    //   setTimeout(() => {
    //     console.log('formattedData', formattedData);
    //     setLoading(false);
    //     setReset({
    //       routeName: '',
    //       pageName: '',
    //       actions: '',
    //       status: '',
    //     });
    //     closeModal();
    //   }, 600);
    // }

  };

  return (
    <Form
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={editPermissionSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Edit permission
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <div className="col-span-full flex flex-wrap gap-4">
              <Input
                label="Route Name"
                value={formData.routeName}
                className="flex-1"
                onChange={(e) => {
                  setFormData({ ...formData, routeName: e.target.value });
                }}
              />
              <Input
                label="Page Name"
                value={formData.pageName}
                className="flex-1"
                onChange={(e) => {
                  setFormData({ ...formData, pageName: e.target.value });
                }}
              />
            </div>

            <Select
              options={[
                { value: 'true', label: 'Active' },
                { value: 'false', label: 'Inactive' },
              ]}
              value={formData.status === true ? 'Active' : 'Inactive'}
              onChange={(selected) => {
                setFormData({ ...formData, status: selected === 'true' });
              }}
              label="Status"
              getOptionValue={(option) => option.value}
              dropdownClassName="!z-[1]"
              className="col-span-full"
              inPortal={false}
            />

            <Textarea
              label="Actions"
              value={permission?.actions}
              className="col-span-full"
              onChange={(e) => {
                setFormData({ ...formData, actions: e.target.value });
              }}
            />

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
                onClick={() => {
                  onSubmit(formData);
                }}
              >
                Update
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
};

export default EditPermission;
