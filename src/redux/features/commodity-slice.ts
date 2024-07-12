import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCommodityList, createCommodityApi } from '@/api/commodity/commodityApi';

interface Commodity {
    id: string;
    name: string;
}

interface CommodityState {
    commodities: Commodity[];
    count: number;
    next: string | null;
    prev: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: CommodityState = {
    commodities: [],
    count: 0,
    next: null,
    prev: null,
    loading: false,
    error: null,
};

export const fetchCommoditiesThunk = createAsyncThunk(
    'commodities/fetchCommodities',
    async ({ authToken, limit, offset }: { authToken: string; limit: number; offset: number }, { rejectWithValue }) => {
        console.log("Access token from redux slice commodity:", authToken);
        try {
            const commoditiesResponse = await fetchCommodityList(authToken, limit, offset);
            return commoditiesResponse;
        } catch (error: any) {
            console.log("Commodity API is not working well. Error:", error);
            return rejectWithValue(error.message as string);
        }
    }
);

export const fetchAllCommoditiesThunk = createAsyncThunk(
    'commodities/fetchAllCommodities',
    async ({ authToken }: { authToken: string }, { rejectWithValue }) => {
        console.log("Access token from redux slice commodity (fetch all):", authToken);
        try {
            let allCommodities: Commodity[] = [];
            let currentOffset = 0;
            const limit = 100;  // Adjust the limit as needed
            let moreDataAvailable = true;

            while (moreDataAvailable) {
                const response = await fetchCommodityList(authToken, limit, currentOffset);
                allCommodities = allCommodities.concat(response.results);
                currentOffset += limit;

                if (response.next === null) {
                    moreDataAvailable = false;
                }
            }

            console.log("All commodities:::::::::::::", allCommodities)
            console.log("All commodities:::::::::::::", allCommodities)
            console.log("All commodities:::::::::::::", allCommodities)

            return {
                count: allCommodities.length,
                next: null,
                previous: null,
                results: allCommodities,
            };
        } catch (error: any) {
            console.log("Commodity API (fetch all) is not working well. Error:", error);
            return rejectWithValue(error.message as string);
        }
    }
);

export const createCommodityThunk = createAsyncThunk<
  { data: Commodity | null; status: number },
  { commodityData: Commodity; accessToken: string },
  { rejectValue: string }
>(
  'commodities/createCommodity',
  async ({ commodityData, accessToken }, { rejectWithValue }) => {
    console.log("Commodity data:", commodityData);
    console.log("Commodity accessToken:", accessToken);
    
    try {
      const response = await createCommodityApi(accessToken, commodityData);
      return { data: response, status: 201 };
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        return { data: null, status: 400 };
      } else if (error.response) {
        return { data: null, status: error.response.status };
      } else {
        console.error("Error occurred in create commodity thunk:", error);
        return rejectWithValue(error.message || 'Failed to create commodity');
      }
    }
  }
);

const commoditySlice = createSlice({
    name: 'commodities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommoditiesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCommoditiesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.commodities = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.prev = action.payload.previous;
            })
            .addCase(fetchCommoditiesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllCommoditiesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCommoditiesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.commodities = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.prev = action.payload.previous;
            })
            .addCase(fetchAllCommoditiesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createCommodityThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCommodityThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 201 && action.payload.data) {
                    state.commodities.push(action.payload.data);
                }
            })
            .addCase(createCommodityThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default commoditySlice.reducer;
