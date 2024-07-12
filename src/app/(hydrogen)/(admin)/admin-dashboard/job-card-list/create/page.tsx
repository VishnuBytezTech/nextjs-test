import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditProduct from '@/app/shared/ecommerce/product/create-edit';
import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui';
import { routes } from '@/config/routes';
import CreateJobCard from '@/app/shared/admin-user/jobcard/create';
import JobCardView from '@/app/shared/admin-user/jobcard/jobcard-view';

export const metadata = {
  ...metaObject('Create jobcard'),
};

const pageHeader = {
  title: 'Create Jobcard',
  breadcrumb: [
    {
      href: routes.admin.adminDashboard,
      name: 'Admin panel',
    },
    {
      href: routes.jobBoard,
      name: 'Jobcard',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateJobCardPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} >
        <Link
          href={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
        </Link>
      </PageHeader>
      <CreateJobCard />
    </>
  );
}
