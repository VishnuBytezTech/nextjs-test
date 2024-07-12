import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createJobTypeApi, fetchJobType } from '@/api/type-of-job/jobTypeApi';

interface JobType {
    id: string;
    name: string;
}

interface JobTypeState {
    jobTypes: JobType[];
    count: number;
    next: string | null;
    previous: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: JobTypeState = {
    jobTypes: [],
    count: 0,
    next: null,
    previous: null,
    loading: false,
    error: null,
};

export const fetchJobTypesThunk = createAsyncThunk(
    'jobTypes/fetchJobTypes',
    async ({ authToken, limit, offset }: { authToken: string; limit: number; offset: number }, { rejectWithValue }) => {
        console.log("Access token from redux slice job type:", authToken);
        try {
            const jobTypesResponse = await fetchJobType(authToken, limit, offset);
            return jobTypesResponse;
        } catch (error: any) {
            console.log("Job type API is not working well. Error:", error);
            return rejectWithValue(error.message as string);
        }
    }
);

export const fetchAllJobTypesThunk = createAsyncThunk(
    'jobTypes/fetchAllJobTypes',
    async ({ authToken }: { authToken: string }, { rejectWithValue }) => {
        console.log("Access token from redux slice job type (fetch all):", authToken);
        try {
            let allJobTypes: JobType[] = [];
            let currentOffset = 0;
            const limit = 100;  // Adjust the limit as needed
            let moreDataAvailable = true;

            while (moreDataAvailable) {
                const response = await fetchJobType(authToken, limit, currentOffset);
                allJobTypes = allJobTypes.concat(response.results);
                currentOffset += limit;

                if (response.next === null) {
                    moreDataAvailable = false;
                }
            }

            return {
                count: allJobTypes.length,
                next: null,
                previous: null,
                results: allJobTypes,
            };
        } catch (error: any) {
            console.log("Job type API (fetch all) is not working well. Error:", error);
            return rejectWithValue(error.message as string);
        }
    }
);

export const createJobTypeThunk = createAsyncThunk<
    { data: JobType | null; status: number },
    { jobTypeData: JobType; accessToken: string }
>(
    'jobTypes/createJobType',
    async ({ jobTypeData, accessToken }, { rejectWithValue }) => {
        try {
            const response = await createJobTypeApi(accessToken, jobTypeData);
            return { data: response, status: 201 };
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                return { data: null, status: 400 };
            } else if (error.response) {
                return { data: null, status: error.response.status };
            } else {
                console.error("Error occurred in create job type thunk:", error);
                return rejectWithValue(error.message || 'Failed to create job type');
            }
        }
    }
);

const jobTypeSlice = createSlice({
    name: 'jobTypes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobTypesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobTypesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.jobTypes = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchJobTypesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllJobTypesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllJobTypesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.jobTypes = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchAllJobTypesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createJobTypeThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createJobTypeThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 201 && action.payload.data) {
                    state.jobTypes.push(action.payload.data);
                }
            })
            .addCase(createJobTypeThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default jobTypeSlice.reducer;
