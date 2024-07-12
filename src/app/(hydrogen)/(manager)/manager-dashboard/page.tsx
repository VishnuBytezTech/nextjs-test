import JobDashboard from '@/app/shared/job-dashboard';
import { metaObject } from '@/config/site.config';
import ManagerDashboard from '@/app/shared/manager-dashboard';

export const metadata = {
  ...metaObject('Job Board'),
};

export default function ManagerIndex() {
  return <ManagerDashboard />;
}