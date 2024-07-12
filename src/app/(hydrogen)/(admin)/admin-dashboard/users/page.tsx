
import JobTypeListTable from '@/app/shared/admin-user/job-type/list'
import UsersPageHeader from './users-page-header';
import UsersListTable from '@/app/shared/manager-user/users/list';


export default function UsersManagementPage() {
  return (
    <>
       <UsersPageHeader />  
      
      <UsersListTable />


    </>
  );
}
