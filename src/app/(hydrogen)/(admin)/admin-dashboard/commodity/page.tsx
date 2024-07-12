import EnhancedTanTable from '@/components/tan-table/enhanced';
import CommodityPageHeader from './commodity-header';
import ClientListTable from '@/app/shared/admin-user/client/list';

import CommodityListTable from '@/app/shared/admin-user/commodity/list';

export default function CommodityPage() {
  return (
    <>
      <CommodityPageHeader /> 

      <CommodityListTable />
      
      {/* <EnhancedTanTable /> */}
    </>
  );
}
