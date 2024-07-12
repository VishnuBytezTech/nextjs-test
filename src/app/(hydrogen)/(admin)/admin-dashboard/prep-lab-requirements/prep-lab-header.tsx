'use client';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { appointmentData } from '@/data/appointment-data';
import { useModal } from '@/app/shared/modal-views/use-modal';

import CreateClient from '@/app/shared/admin-user/client/create-client/create-client';
import CreatePrepLabRequirement from '@/app/shared/admin-user/prep-lab-requirement/create';

const pageHeader = {
  title: 'Prep Lab Requirements ',
  breadcrumb: [
    {
      href: routes.manager.manager,
      name: 'Dashboard',
    },
    {
      name: 'Prep lab requirements management',
    },
  ],
};

interface HeaderProps {
  className?: string;
}

export default function PrepLabReqPageHeader({ className }: HeaderProps) {
  const { closeModal, openModal } = useModal();
  function handleCreateClient() {
    closeModal(),
      openModal({
        view: <CreatePrepLabRequirement />,
        customSize: '620px',
      });
  }
  return (
    <PageHeader title={pageHeader.title} >
      <div className="mt-4 flex flex-col items-center gap-3 @sm:flex-row @lg:mt-0">

          <Button className="w-full @lg:w-auto" onClick={handleCreateClient}>
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Create Prep Lab Requirement
          </Button>

      </div>
    </PageHeader>
  );
}
