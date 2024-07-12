"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createJobcardApi, fetchJobcardsApi, fetchJobCardDetailsApi } from '@/api/jobcard/jobcard-api';

interface Jobcard {
    // id : string;
    client: string;
    description: string;
    commodity: string;
    job_type: string;
    clientRef: string;
    startDate: Date;
    endDate: Date;
    address: string;
    city: string;
    country: string;
}

interface JobCardDetails {
    id: string | null;
    internal_ref: string | null;
    description: string | null;
    job_card_status: string | null;
    commodity: {
        id: string | null;
        name: string | null;
    } | null;
    job_type: {
        id: string | null;
        name: string | null;
    } | null;
    client: {
        id: string | null;
        name: string | null;
        email: string | null;
        phone: number | null;
        country: {
            id: string | null;
            iso: string | null;
            name: string | null;
        } | null;
    } | null;
    client_ref: string | null;
    start_date: Date | null;
    end_date: Date | null;
    address: string | null;
    city: string | null;
    country: {
        id: string | null;
        iso: string | null;
        name: string | null;
    } | null;
    supervisor: string | null;
    prep_lab_user: string | null;
    lab_user: string | null;
    user_created: string | null;
    user_modified: string | null;
    prep_lab_requirements: [] | null;
    lab_requirements: [] | null;
    comments: [] | null;
}

interface JobcardState {
    jobcards: Jobcard[];
    count: number;
    next: string | null;
    previous: string | null;
    loading: boolean;
    error: string | null;
    jobCardDetails: JobCardDetails | null;
}

const initialState: JobcardState = {
    jobcards: [],
    count: 0,
    next: null,
    previous: null,
    loading: false,
    error: null,
    jobCardDetails: null,
};

export const fetchJobcardsThunk = createAsyncThunk(
    'jobcards/fetchJobcards',
    async ({ authToken, limit, offset }: { authToken: string; limit: number; offset: number }, { rejectWithValue }) => {
        console.log("Auth token from jobcard api ", authToken)
        try {
            const jobcardsResponse = await fetchJobcardsApi(authToken, limit, offset);
            return jobcardsResponse;
        } catch (error: any) {
            console.log("Jobcard API is not working well error::", error);
            return rejectWithValue(error.message as string);
        }
    }
);

// Error function 
export const createJobcardThunk = createAsyncThunk<
    { data: Jobcard | null; status: number },
    { newJobCard: Jobcard; accessToken: string },
    {rejectValue :string}
>(
    'jobcards/createJobcard',
    async ({ newJobCard, accessToken }, { rejectWithValue }) => {
        console.log("Jobcard deatils >>>>>>>>::::::::::::::::::::::::::")
        console.log("Jobcard deatils >>>>>>>>::::::::::::::::::::::::::", newJobCard)
        console.log("Jobcard deatils >>>>>>>>::::::::::::::::::::::::::")
        try {
            const response = await createJobcardApi(accessToken, newJobCard);
            return { data: response, status: 201 };
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                return { data: null, status: 400 };
            } else if (error.response) {
                return { data: null, status: error.response.status };
            } else {
                console.error("Error occurred in create jobcard thunk:", error);
                return rejectWithValue(error.message || 'Failed to create job card');
            }
        }
    }
);
///////////

export const fetchJobCardDetailsThunk = createAsyncThunk(
    'jobcards/fetchJobCardDetails',
    async ({ authToken, jobId }: { authToken: string; jobId: string }, { rejectWithValue }) => {
        try {
            const jobCardDetails = await fetchJobCardDetailsApi(authToken, jobId);
            return jobCardDetails;
        } catch (error: any) {
            console.log("JobCard details API is not working well error::", error);
            return rejectWithValue(error.message as string);
        }
    }
);


const jobcardSlice = createSlice({
    name: "jobcards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobcardsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobcardsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.jobcards = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchJobcardsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createJobcardThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createJobcardThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 201 && action.payload.data) {
                    state.jobcards.push(action.payload.data);
                }
            })
            .addCase(createJobcardThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchJobCardDetailsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobCardDetailsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.jobCardDetails = action.payload;
                state.error = null; 
            })
            .addCase(fetchJobCardDetailsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
            
    },
});

export default jobcardSlice.reducer;
