import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPrepLabReqApi, createPrepLabReqApi } from '@/api/prep-lab-requirement/prep-lab-requirementApi';

interface PreplabRequirement {
    id?: string;
    name: string;
}

interface PrepLabRequirementState {
    prepLabRequirements: PreplabRequirement[];
    count: number;
    next: string | null;
    previous: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: PrepLabRequirementState = {
    prepLabRequirements: [],
    count: 0,
    next: null,
    previous: null,
    loading: false,
    error: null,
};

export const fetchPrepLabRequirementsThunk = createAsyncThunk(
    'prepLabRequirements/fetchPrepLabRequirements',
    async ({ authToken, limit, offset }: { authToken: string; limit: number; offset: number }, { rejectWithValue }) => {
        try {
            const prepLabRequirementsResponse = await fetchPrepLabReqApi(authToken, limit, offset);
            return prepLabRequirementsResponse;
        } catch (error: any) {
            return rejectWithValue(error.message as string);
        }
    }
);

export const createPrepLabRequirementThunk = createAsyncThunk<
  { data: PreplabRequirement | null; status: number },
  { prepLabRequirementData: PreplabRequirement; accessToken: string }
>(
    'prepLabRequirements/createPrepLabRequirement',
    async ({ prepLabRequirementData, accessToken }, { rejectWithValue }) => {
        console.log("prep lage data ::: from redux", prepLabRequirementData)
        console.log("prep lab accesstoke, ::: from redux", accessToken)
        try {
            const response = await createPrepLabReqApi(accessToken, prepLabRequirementData);
            return { data: response, status: 201 };
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                return { data: null, status: 400 };
            } else if (error.response) {
                return { data: null, status: error.response.status };
            } else {
                return rejectWithValue(error.message || 'Failed to create prep lab requirement');
            }
        }
    }
);

export const fetchAllPrepLabRequirementsThunk = createAsyncThunk(
    'prepLabRequirements/fetchAllPrepLabRequirements',
    async ({ authToken }: { authToken: string }, { rejectWithValue }) => {
        try {
            let allPrepLabRequirements: PreplabRequirement[] = [];
            let currentOffset = 0;
            const limit = 100; // Adjust the limit as needed
            let moreDataAvailable = true;

            while (moreDataAvailable) {
                const response = await fetchPrepLabReqApi(authToken, limit, currentOffset);
                allPrepLabRequirements = allPrepLabRequirements.concat(response.results);
                currentOffset += limit;

                if (response.next === null) {
                    moreDataAvailable = false;
                }
            }

            return {
                count: allPrepLabRequirements.length,
                next: null,
                previous: null,
                results: allPrepLabRequirements,
            };
        } catch (error: any) {
            console.log("Prep lab requirements slice (fetch all) API error:", error);
            return rejectWithValue(error.message as string);
        }
    }
);


const prepLabRequirementsSlice = createSlice({
    name: "prepLabRequirements",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPrepLabRequirementsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPrepLabRequirementsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.prepLabRequirements = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchPrepLabRequirementsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createPrepLabRequirementThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPrepLabRequirementThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 201 && action.payload.data) {
                    state.prepLabRequirements.push(action.payload.data);
                }
            })
            .addCase(createPrepLabRequirementThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllPrepLabRequirementsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllPrepLabRequirementsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.prepLabRequirements = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchAllPrepLabRequirementsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default prepLabRequirementsSlice.reducer;



