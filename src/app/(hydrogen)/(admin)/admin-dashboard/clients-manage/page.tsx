import ClientListTable from '@/app/shared/admin-user/client/list';
import ClientsManagementPageHeader from './clients-manage-header';




export default function ClientManagementPage() {
  return (
    <>
      <ClientsManagementPageHeader />  
      
      <ClientListTable />
      
     
    </>
  );
}
