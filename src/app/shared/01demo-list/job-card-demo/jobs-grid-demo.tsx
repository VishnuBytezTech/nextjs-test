import RoleCard from '@/app/shared/roles-permissions/role-card';
import { rolesList } from '@/data/roles-permissions';
import cn from '@/utils/class-names';

import JobCardDemo from './job-card-demo';

interface RolesGridProps {
  className?: string;
  gridClassName?: string;
}

export default function JobCardDemoGrid({
  className,
  gridClassName,
}: RolesGridProps) {
  return (
    <div className={cn('@container', className)}>
      <div
        className={cn(
          'grid grid-cols-1 gap-6 @[36.65rem]:grid-cols-2 @[56rem]:grid-cols-3 @[78.5rem]:grid-cols-4 @[100rem]:grid-cols-5',
          gridClassName
        )}
      >
        {/* {rolesList.map((role) => (
          <JobCardDemo key={role.name} {...role} />
        ))} */}
      </div>
      <p>this is the demo page</p>
    </div>
  );
}
