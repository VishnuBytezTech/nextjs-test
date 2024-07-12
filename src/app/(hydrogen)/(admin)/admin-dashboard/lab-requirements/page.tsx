import ClientListTable from '@/app/shared/admin-user/client/list';
import LabReqPageHeader from './lab-req-header';
import LabRequirementsTable from '@/app/shared/admin-user/lab-requirements/list';


export default function ClientManagementPage() {
  return (
    <>
      <LabReqPageHeader />  
      
      <LabRequirementsTable />
      
      {/* <EnhancedTanTable /> */}
    </>
  );
}
