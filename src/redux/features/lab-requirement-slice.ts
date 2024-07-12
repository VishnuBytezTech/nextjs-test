import { fetchLabRequirements, createLabRequirementApi } from '@/api/lab-requirements/labReqApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface LabRequirement {
    id: string;
    name: string;
}

interface LabRequirementState {
    labRequirements: LabRequirement[];
    count: number;
    next: string | null;
    previous: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: LabRequirementState = {
    labRequirements: [],
    count: 0,
    next: null,
    previous: null,
    loading: false,
    error: null,
};

export const fetchLabReqThunk = createAsyncThunk(
    'labreq/fetchLabReq',
    async ({ authToken, limit, offset }: { authToken: string; limit: number; offset: number }, { rejectWithValue }) => {
        console.log("access token form redux slice lab req ::::", authToken);
        try {
            const labReqResponse = await fetchLabRequirements(authToken, limit, offset);
            return labReqResponse;
        } catch (error: any) {
            console.log("in lab req slice Lab req API error::", error);
            return rejectWithValue(error.message as string);
        }
    }
);

export const createLabRequirementThunk = createAsyncThunk<
    { data: LabRequirement | null; status: number },
    { labRequirementData: LabRequirement; accessToken: string }
>(
    'labreq/createLabRequirement',
    async ({ labRequirementData, accessToken }, { rejectWithValue }) => {
        try {
            const response = await createLabRequirementApi(accessToken, labRequirementData);
            console.log("datas ::access", accessToken)
            console.log("datas ::data", labRequirementData)
            return { data: response, status: 201 };
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                return { data: null, status: 400 };
            } else if (error.response) {
                return { data: null, status: error.response.status };
            } else {
                console.error("Error occurred in create lab requirement thunk:", error);
                return rejectWithValue(error.message || 'Failed to create lab requirement');
            }
        }
    }
);

export const fetchAllLabRequirementsThunk = createAsyncThunk(
    'labreq/fetchAllLabRequirements',
    async ({ authToken }: { authToken: string }, { rejectWithValue }) => {
        console.log("access token form redux slice lab req (fetch all) ::::", authToken);
        try {
            let allLabRequirements: LabRequirement[] = [];
            let currentOffset = 0;
            const limit = 100; // Adjust the limit as needed
            let moreDataAvailable = true;

            while (moreDataAvailable) {
                const response = await fetchLabRequirements(authToken, limit, currentOffset);
                allLabRequirements = allLabRequirements.concat(response.results);
                currentOffset += limit;

                if (response.next === null) {
                    moreDataAvailable = false;
                }
            }

            return {
                count: allLabRequirements.length,
                next: null,
                previous: null,
                results: allLabRequirements,
            };
        } catch (error: any) {
            console.log("Lab req slice (fetch all) Lab req API error::", error);
            return rejectWithValue(error.message as string);
        }
    }
);


const labReqSlice = createSlice({
    name: "labRequirements",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLabReqThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLabReqThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.labRequirements = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchLabReqThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createLabRequirementThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createLabRequirementThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 201 && action.payload.data) {
                    state.labRequirements.push(action.payload.data);
                }
            })
            .addCase(createLabRequirementThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllLabRequirementsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllLabRequirementsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.labRequirements = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchAllLabRequirementsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default labReqSlice.reducer;







