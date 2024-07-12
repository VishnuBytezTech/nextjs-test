import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
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

const value = 'jobcard value'

export default function GeneralDetailsView({ className, jobCardDetails }: { className?: string, jobCardDetails:any }) {

  console.log("jopbcard details from the general details page ::::", jobCardDetails)

  return (
    <div    
      className={cn(className)}
    >
      <div className='mb-3'>
        <p className='font-semibold text-base' >General Details</p>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex-1 ">
          <div>
            <p className='font-semibold text-sm'>Client</p>
            <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
              <p>{jobCardDetails?.client?.name ? jobCardDetails?.client?.name : "Client name is not added"}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <div>
            <p className='font-semibold text-sm'>Client Ref</p>
            <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
              <p>{jobCardDetails?.client_ref ? jobCardDetails?.client_ref : "Client ref is not added yet"}</p>
            </div>
          </div>
        </div>
      </div>

        <div className='mb-4'>
            <p className='font-semibold text-sm'>Description</p>
            <div className=" border-gray-300 border-2 shadow-sm rounded-md mt-2 h-12 w-full pl-3 flex items-center ">
                <p> {jobCardDetails?.description ? jobCardDetails?.description : "Description  is not added" }</p>
            </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <div>
              <p className='font-semibold text-sm'>Commodity</p>
              <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                <p>{jobCardDetails?.commodity?.name ? jobCardDetails?.commodity?.name : "Commodity is not added yet"}</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div>
              <p className='font-semibold text-sm'>Location</p>
              <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                <p>
                  {jobCardDetails?.city && `${jobCardDetails.city}, `}
                  {jobCardDetails?.address && `${jobCardDetails.address}, `}
                  {jobCardDetails?.country?.name && `${jobCardDetails?.country?.name}`}
                </p>
              </div>
            </div>
          </div>
        </div>



        <div className="flex space-x-4">
          <div className="flex-1">
            <div>
              <p className='font-semibold text-sm'>Start date</p>
              <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                <p>{jobCardDetails?.start_date ? jobCardDetails?.start_date : "Start date not added"}</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div>
              <p className='font-semibold text-sm'>End date</p>
              <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                <p>{jobCardDetails?.end_date ? jobCardDetails?.end_date : "End date not added"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <div className="flex-1">
            <div>
              <p className='font-semibold text-sm'>Type of job</p>
              <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                <p>{jobCardDetails?.job_type?.name ? jobCardDetails?.job_type?.name : "Job type is not added"}</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div>
              <p className='font-semibold text-sm'>Jobcard Status</p>
              <div className="border-gray-300 border-2 shadow-sm rounded-md mt-2 h-10 w-full pl-3 flex items-center justify-self-end">
                <p>{jobCardDetails?.status ? jobCardDetails?.status : "Job status not added"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full h-24 '>

        </div>




    </div>
  );
}
