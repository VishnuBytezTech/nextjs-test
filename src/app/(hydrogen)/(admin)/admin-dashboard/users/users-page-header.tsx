'use client';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { appointmentData } from '@/data/appointment-data';
import { useModal } from '@/app/shared/modal-views/use-modal';
import InviteUser from '@/app/shared/manager-user/users/invite-page/invite-user';

const pageHeader = {
  title: 'Users',
  breadcrumb: [
    {
      href: routes.manager.manager,
      name: 'Dashboard',
    },
    {
      name: 'Users',
    },
  ],
};

interface HeaderProps {
  className?: string;
}

export default function UsersPageHeader({ className }: HeaderProps) {
  const { closeModal, openModal } = useModal();

  const handleCreateUser = () => {
    closeModal(); 
    openModal({
      view: <InviteUser />,
      customSize: '620px',
    });
  }

  return (
    <PageHeader title={pageHeader.title}>
      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row lg:mt-0">
        <Button className="w-full lg:w-auto" onClick={handleCreateUser}>
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          Invite New User
        </Button>
      </div>
    </PageHeader>
  );
}
