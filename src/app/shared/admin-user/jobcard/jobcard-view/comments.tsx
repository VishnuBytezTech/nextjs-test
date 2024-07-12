import { Controller, useFormContext,  } from 'react-hook-form';
import { Input, Title, Button } from 'rizzui';

import FormGroup from '@/app/shared/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';







import cn from '@/utils/class-names';
import { IoPersonSharp } from 'react-icons/io5';

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

export default function JobCardCommentsView({ className, jobCardDetails }: { className?: string, jobCardDetails:any }) {

  console.log("jopbcard details from the general details page ::::", jobCardDetails)

  return (
    <div    
      className={cn(className)}
    >
        <div className='-mt-5'>
            <p className='font-semibold text-base' >
                Comments
            </p>

        </div>
        
        <div className='border-gray-300 border-2 shadow-sm rounded-lg px-3'>

                <div className="py-3  custom-scrollbar -me-2 mt-[18px] grid h-[280px]  overflow-y-auto @sm:gap-5">

                    <div className="flex  p-2 items-start pe-2">
                        <div className="relative rounded-full me-3 h-6 w-6 shrink-0 overflow-hidden  bg-gray-100 @sm:h-6 @sm:w-6">
                            <IoPersonSharp className='w-full h-full' />
                        </div>
                        <div className="flex w-full items-start  justify-between">
                        <div className='border border-gray-300 shadow-md rounded-md p-2'>
                            <p className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">
                            username
                            </p>
                            <p className="text-gray-500"> Lorem Ipsum is simply dummy text of the printing and </p>
                        </div>
                        <div>
                        </div>
                        </div>
                    </div>
                    
                </div>

            <div className=' w-full h-auto px-2 py-3'>
                <Controller
                    // control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                    <QuillEditor
                        value={value}
                        onChange={onChange}
                        label=""
                        className="col-span-full [&_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                    )}
                />
                <div className='flex p-1'>
                    <Button className='ml-auto'>Submit</Button>

                </div>


            </div>
        </div>






    </div>
  );
}
