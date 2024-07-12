import { metaObject } from '@/config/site.config';
import JobListPageHeader from './job-list-header';
import JobcardListTable from '@/app/shared/jobcard/jobcard-list/list';

export const metadata = {
  ...metaObject('Appointment List'),
};

export default function JobListPage() {
  return (
    <>
      <JobListPageHeader />
      <div className="flex flex-col gap-10 @container">
        <JobcardListTable />
      </div>
    </>
  );
}
