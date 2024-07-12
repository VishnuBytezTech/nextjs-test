'use client';

import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { appointmentData } from '@/data/appointment-data';
import { useModal } from '@/app/shared/modal-views/use-modal';

import CreateClient from '@/app/shared/admin-user/client/create-client/create-client';

const pageHeader = {
  title: 'Clients Management',
  breadcrumb: [
    {
      href: routes.manager.manager,
      name: 'Dashboard',
    },
    {
      name: 'Clients management',
    },
  ],
};

interface HeaderProps {
  className?: string;
}

export default function ClientsManagementPageHeader({ className }: HeaderProps) {
  const { closeModal, openModal } = useModal();

  function handleCreateClient() {
    closeModal(),
      openModal({
        view: <CreateClient />,
        customSize: '620px',
      });
  }

  return (
    // <PageHeader title={pageHeader.title} >
    <PageHeader title={pageHeader.title} >
      <div className="mt-4 flex flex-col items-center gap-3 @sm:flex-row @lg:mt-0">
        <ExportButton
          data={appointmentData}
          fileName="appointment_data"
          header="ID,Patient,Doctor,Service Type,Date,Status,Payment,Duration"
        />
          <Button className="w-full @lg:w-auto" onClick={handleCreateClient}>
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Create Client
          </Button>

      </div>
    </PageHeader>
  );
}
