import { usersData } from '@/data/users-data';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import RolesGrid from '@/app/shared/roles-permissions/roles-grid';
import UsersTable from '@/app/shared/roles-permissions/users-table';
import CreateRole from '@/app/shared/roles-permissions/create-role';


import JobCardDemoGrid from '@/app/shared/01demo-list/job-card-demo/jobs-grid-demo';



const pageHeader = {
  title: 'Job cards demo page',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Job card and management',
    },
  ],
};

export default function JobCardPage() {
  return (
    <>
      <PageHeader title={pageHeader.title}>
        <ModalButton label="Add New jobcard" view={<CreateRole />} />
      </PageHeader>
      <JobCardDemoGrid />

    </>
  );
}