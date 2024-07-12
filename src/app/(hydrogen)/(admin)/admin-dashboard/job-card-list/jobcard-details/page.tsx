'use client';

import { Title } from 'rizzui';
import JobCardDetailsHeader from './details-header';
import ProductDetailsGallery from '@/app/shared/ecommerce/product/product-details-gallery';
import JobCardBasicDetails from '@/app/shared/admin-user/jobcard/details/basic-details';
import CreateJobCard from '@/app/shared/admin-user/jobcard/create';
import JobCardView from '@/app/shared/admin-user/jobcard/jobcard-view';
import TrackingHistory from '@/app/shared/logistics/tracking/tracking-history';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
// import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-hooks';
import { fetchJobCardDetailsThunk } from '@/redux/features/jobcard-slice';
import { RootState, AppDispatch } from '@/redux/store';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';


export default function JobCardDetailsPage() {


// Use throughout your app instead of plain `useDispatch` and `useSelector`
  const useAppDispatch = () => useReduxDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

  const router = useRouter();
  const [jobId, setJobId] = useState<string | null>(null);
  // const dispatch = useDispatch()
  const dispatch = useAppDispatch();
  const authToken = localStorage.getItem('accessToken');

  // const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    setJobId(id);
  }, []);

  const jobCardDetails = useAppSelector(
    (state: RootState) => state.jobcardreducer.jobCardDetails
  );

  useEffect(() => {
    if (authToken && jobId) {
      dispatch(fetchJobCardDetailsThunk({ authToken, jobId }));
    }
  }, [dispatch, authToken, jobId]);

  useEffect(() => {
    console.log('route id ::::::::', jobId);
  }, [jobId]);

  return (
    <>
      <JobCardDetailsHeader />

      <div className="flex">
        <div className="w-2/3 p-4">
          <JobCardView jobCardDetails={jobCardDetails} />
        </div>

        {/* <div className="w-1/3 p-4">
         <p>Comment section will be here</p>
          <TrackingHistory /> 
        </div> */}
      </div>
    </>
  );
}
