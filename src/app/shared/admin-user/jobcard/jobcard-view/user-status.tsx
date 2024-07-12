import { Controller, useFormContext } from 'react-hook-form';
import { Input, Title } from 'rizzui';

import FormGroup from '@/app/shared/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';

import cn from '@/utils/class-names';

import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';

// const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
//   ssr: false,
//   loading: () => <SelectLoader />,
// });
// const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
//   ssr: false,
//   loading: () => <QuillLoader className="col-span-full h-[143px]" />,
// });

const value = 'jobcard value'

export default function UserStatusView({ className, jobCardDetails }: { className?: string, jobCardDetails:any }) {

  console.log("jopbcard details from the general details page ::::", jobCardDetails)

  return (
    <div    
      className={cn(className)}
    >
        <div className='mb-3'>
            <p className='font-semibold text-base' >
                User Status
            </p>

        </div>

        <div className="flex space-x-4 mb-4">
            <div className="flex-1 ">
                <div className='flex'>
                    <div className="flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                        <p className='ml-5'>Admin</p>
                    </div>
                    <div className="flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-start">
                        <p className='bg-blue-500 px-3 font-light text-sm rounded-lg shadow-md text-white'>Admin</p>
                    </div>

                    <div className=" flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                        
                    </div>

                </div>
            </div>
            <div className="flex-1 ">
                <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                    <p>{jobCardDetails?.client_ref ? jobCardDetails?.client_ref : "Manager status"}</p>
                </div>
            </div>
        </div>

        <div className="flex space-x-4 mb-4">
            <div className="flex-1 ">
                <div className='flex'>
                    <div className="flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                        <p className='ml-5'>Manager</p>
                    </div>
                    <div className="flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-start">
                        <p className='bg-blue-500 px-3 font-light text-sm rounded-lg shadow-md text-white'>Manager</p>
                    </div>
                    <div className=" flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-self-end">

                    </div>

                </div>
            </div>
            <div className="flex-1 ">
                <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                    <p>{jobCardDetails?.client_ref ? jobCardDetails?.client_ref : "Manager status"}</p>
                </div>
            </div>
        </div>


        <div className="flex space-x-4 mb-4">
            <div className="flex-1 ">
                <div className='flex'>
                    <div className="flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                        <p className='ml-5'>Prep lab</p>
                    </div>
                    <div className="flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-start">
                        <p className='bg-blue-500 px-3 font-light text-sm rounded-lg shadow-md text-white'>Prep Lab</p>
                    </div>
                    <div className=" flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-self-end">

                    </div>

                </div>
            </div>
            <div className="flex-1 ">
                <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                    <p>{jobCardDetails?.client_ref ? jobCardDetails?.client_ref : "Manager status"}</p>
                </div>
            </div>
        </div>


        <div className="flex space-x-4 mb-4">
            <div className="flex-1 ">
                <div className='flex'>
                    <div className="flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                        <p className='ml-5'>Lab</p>
                    </div>
                    <div className="flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-start">
                        <p className='bg-gray-800 px-3 font-light text-sm rounded-lg shadow-md text-white'>Lab</p>
                    </div>
                    <div className=" flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-self-end">

                    </div>

                </div>
            </div>
            <div className="flex-1 ">
                <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                    <p>{jobCardDetails?.client_ref ? jobCardDetails?.client_ref : "Manager status"}</p>
                </div>
            </div>
        </div>

        <div className="flex space-x-4 mb-4">
            <div className="flex-1 ">
                <div className='flex'>
                    <div className="flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                        <p className='ml-5'>Supervisor</p>
                    </div>
                    <div className="flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-start">
                        <p className='bg-gray-800 px-3 font-light text-sm rounded-lg shadow-md text-white'>Supervisor</p>
                    </div>
                    <div className=" flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-self-end">

                    </div>

                </div>
            </div>
            <div className="flex-1 ">
                <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                    <p>{jobCardDetails?.client_ref ? jobCardDetails?.client_ref : "Manager status"}</p>
                </div>
            </div>
        </div>

        <div className="flex space-x-4 mb-4">
            <div className="flex-1 ">
                <div className='flex'>
                    <div className="flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                        <p className='ml-5'>Finance</p>
                    </div>
                    <div className="flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-start">
                        <p className='bg-gray-800 px-3 font-light text-sm rounded-lg shadow-md text-white'>Finance</p>
                    </div>
                    <div className=" flex-1 mt-2 h-10 w-full pl-3 flex items-center justify-self-end">

                    </div>

                </div>
            </div>
            <div className="flex-1 ">
                <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                    <p>{jobCardDetails?.client_ref ? jobCardDetails?.client_ref : "Manager status"}</p>
                </div>
            </div>
        </div>
        







    </div>
  );
}
