'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@/utils/class-names';

// import FormNav, {
//   formParts,
// } from '@/app/shared/ecommerce/product/create-edit/form-nav';

import { defaultValues } from '@/app/shared/ecommerce/product/create-edit/form-utils'; // need to remove sample data

import GeneralDetailsView from '@/app/shared/admin-user/jobcard/jobcard-view/general-details';
import UserStatusView from './user-status';
// import FormNav from './form-nav'; 
import FormNav from '@/app/shared/admin-user/jobcard/create/form-nav';

///
import ViewNav, { 
    menuItems, 
    viewParts 
    } from '@/app/shared/admin-user/jobcard/jobcard-view/details-nav';

import FormFooter from '@/components/form-footer';
import {
  CreateProductInput,
  productFormSchema,
} from '@/utils/validators/create-product.schema';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import JobCardCommentsView from './comments';

const MAP_STEP_TO_COMPONENT = {
  [viewParts.general]: GeneralDetailsView,
  // [viewParts.userStatus]: UserStatusView,
  [viewParts.comments]: JobCardCommentsView

};

interface IndexProps {
  slug?: string;
  className?: string;
  product?: CreateProductInput;
  jobCardDetails?: any;
}

export default function JobCardView({
  slug,
  product,
  className,
  jobCardDetails
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  console.log("jobcard details form form index :::", jobCardDetails)
  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues(product),
  });

  // const onSubmit: SubmitHandler<CreateProductInput> = (data) => {
  //   console.log("prodect submit function works :::::")
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     console.log('product_data', data);
  //     toast.success(
  //       <Text as="b">Jobcard successfully {slug ? 'updated' : 'created'}</Text>
  //     );
  //     methods.reset();
  //   }, 600);
  // };

  return (
    <div className="@container">
      <ViewNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && 'z-[999] 2xl:top-[72px]'
        )}
      />
      <FormProvider {...methods}>
        <div
          // onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={viewParts[key as keyof typeof viewParts]}
              >
                {<Component jobCardDetails={jobCardDetails} className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          {/* <FormFooter
            isLoading={isLoading}
            submitBtnText={'Create Jobcard its view'}
          /> */}

        </div>
      </FormProvider>
    </div>
  );
}
