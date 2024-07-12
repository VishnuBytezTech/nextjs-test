"use client"


import JobcardListPageHeader from './jobcard-list-header';

import JobcardList from '@/app/shared/admin-user/jobcard/jobcard-list/list';
import { useEffect } from 'react';
import { checkUserIsAdmin, checkUserIsManager, checkUserIsSupervisor, useUserRole } from '@/user-permissions/user-permissions';
import toast from 'react-hot-toast';
import { Text } from 'rizzui';
import { useRouter } from 'next/navigation';


export default function JobCardPage() {

  const router = useRouter()
  const role = useUserRole()

  useEffect(() => {
    console.log("User role from jobcard section ::::::")

    if (checkUserIsAdmin(role) || checkUserIsManager(role) || checkUserIsSupervisor(role)){
      console.log("admin manager and supervisor can access this page")
    }else{
      console.log("user cannot access to this page  :::")
      router.push('/signin')

      setTimeout(() => {
        toast.error(
          <Text>
            Only Admin users can access this page
          </Text>
        );
      }, 500); 

    }
  }, [])


  return (
    <>
      <JobcardListPageHeader />
      
      {/*  expansable table   */}
      <JobcardList />

    </>
  );
}
