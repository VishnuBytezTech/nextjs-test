import { configureStore } from '@reduxjs/toolkit' ;
import permissionReducer from './features/permission-slice';
import authReducer from './features/authentication-slice';
import jobcardreducer from './features/jobcard-slice';
import clientreducer from './features/client-slice';
import commodityreducer from './features/commodity-slice';
import countryreducer from './features/country-slice';
import jobtypereducer from './features/job-type-slice';
import labrequirementreducer from './features/lab-requirement-slice';
import preplabrequirementreducer from './features/prep-lab-requirement-slice';
import userinvitationreducer from './features/user-invitation-slice';

export const store = configureStore({
    reducer:{
        permissionReducer,
        authReducer,
        jobcardreducer,
        clientreducer,
        commodityreducer,
        countryreducer,
        jobtypereducer,
        labrequirementreducer,
        preplabrequirementreducer,
        userinvitationreducer

        

    }
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch







