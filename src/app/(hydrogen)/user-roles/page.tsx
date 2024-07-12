import { metaObject } from '@/config/site.config';
import PermissionListPageHeader from '../permission-manager/permission-list-header';
import PermissionListTable from '@/app/shared/permission-manager/permission-list/list';
import UserRoleListPageHeader from './user-role-list-header';


export const metadata = {
  ...metaObject('Appointment List'),
};

export default function PermissionListPage() {
  return (
    <>
      <UserRoleListPageHeader />
      <div className="flex flex-col gap-10 @container">
        <PermissionListTable />
      </div>
    </>
  );
}