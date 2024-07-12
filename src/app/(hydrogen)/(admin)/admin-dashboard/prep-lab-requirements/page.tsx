import PrepLabReqPageHeader from './prep-lab-header';
import PrepLabRequirementsListTable from '@/app/shared/admin-user/prep-lab-requirement/list';



export default function ClientManagementPage() {
  return (
    <>
      <PrepLabReqPageHeader />  
      <PrepLabRequirementsListTable />

    </>
  );
}
