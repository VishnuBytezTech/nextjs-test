import ClientListTable from '@/app/shared/admin-user/client/list';

// import ClientsManagementPageHeader from './clients-manage-header';

import EnhancedTanTable from '@/components/tan-table/enhanced';


import JobTypePageHeader from './job-type-header';
import JobTypeListTable from '@/app/shared/admin-user/job-type/list';


export default function JobTypeManagementPage() {
  return (
    <>
      <JobTypePageHeader />  
      
      <JobTypeListTable />
      
      {/* <EnhancedTanTable /> */}
    </>
  );
}
