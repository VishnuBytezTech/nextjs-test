'use client';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { appointmentData } from '@/data/appointment-data';
import { useModal } from '@/app/shared/modal-views/use-modal';

import CreateJobcard from '@/app/shared/admin-user/jobcard/jobcard-forms/create-jobcard';
import PencilIcon from '@/components/icons/pencil';

const pageHeader = {
  title: 'Jobcard Details',
  breadcrumb: [
    {
      href: routes.admin.adminDashboard,
      name: 'Dashboard',
    },
    {
      name: 'Jobcard List',
      href: routes.admin.jobCardPanel
    },
    {
      name: 'Details',
    },
  ],
};

interface HeaderProps {
  className?: string;
}

export default function JobCardDetailsHeader({ className }: HeaderProps) {
  const { closeModal, openModal } = useModal();
  // function handleCreateModal() {
  //   closeModal(),
  //     openModal({
  //       view: <CreateJobcard />,
  //       customSize: '920px',
  //     });
  // }
  return (
    <PageHeader title={pageHeader.title} >
      <div className="mt-4 flex flex-col items-center gap-3 @sm:flex-row @lg:mt-0">
        {/* <ExportButton
          data={appointmentData}
          fileName="appointment_data"
          header="ID,Patient,Doctor,Service Type,Date,Status,Payment,Duration"
        /> */}
        <Link href={routes.admin.jobcardCreate}>
          <Button className="w-full @lg:w-auto" >
            <PencilIcon className="me-1.5 h-[17px] w-[17px]" />
            Edit Jobcard
          </Button>
        </Link>
      </div>
    </PageHeader>
  );
}
