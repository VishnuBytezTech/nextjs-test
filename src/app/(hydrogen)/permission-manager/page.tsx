import { metaObject } from '@/config/site.config';
import PermissionListPageHeader from './permission-list-header';
import PermissionListTable from '@/app/shared/permission-manager/permission-list/list';


export const metadata = {
  ...metaObject('Appointment List'),
};

export default function PermissionListPage() {
  return (
    <>
      <PermissionListPageHeader />
      <div className="flex flex-col gap-10 @container">
        <PermissionListTable />
      </div>
    </>
  );
}
