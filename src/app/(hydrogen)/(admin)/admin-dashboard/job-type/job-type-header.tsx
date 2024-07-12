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
import CreateClient from '@/app/shared/admin-user/client/create-client/create-client';
import CreateJobType from '@/app/shared/admin-user/job-type/create/create-job-type';

const pageHeader = {
  title: 'Job Type Management',
  breadcrumb: [
    {
      href: routes.manager.manager,
      name: 'Dashboard',
    },
    {
      name: 'job Type Management',
    },
  ],
};

interface HeaderProps {
  className?: string;
}

export default function JobTypePageHeader({ className }: HeaderProps) {
  const { closeModal, openModal } = useModal();
  function handleCreateClient() {
    closeModal(),
      openModal({
        view: <CreateJobType />,
        customSize: '620px',
      });
  }
  return (
    <PageHeader title={pageHeader.title} >
      <div className="mt-4 flex flex-col items-center gap-3 @sm:flex-row @lg:mt-0">

          <Button className="w-full @lg:w-auto" onClick={handleCreateClient}>
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Create jobtype
          </Button>

      </div>
    </PageHeader>
  );
}
