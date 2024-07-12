import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCoutries } from '@/api/countries/countriesApi';

interface CountryState {
        id: string;
        iso: string;
        name: string;

}

interface CountryDetailState {
    client: CountryState | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

interface InitialState {
    countries: CountryState[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    countryDetail: CountryDetailState;
}

const initialState: InitialState = {
    countries: [],
    status: 'idle',
    error: null,
    countryDetail: {
        client: null,
        status: 'idle',

        error: null,
    },
}

export const fetchCountryThunk = createAsyncThunk(
    'countires/fetchCountris',
    async (_, { rejectWithValue }) => {
        try {
            const countries = await fetchCoutries();
            console.log("Country api is working from redux ")
            return countries;
        } catch (error: any) {
            console.log("Country api is not working well error::", error)
            return rejectWithValue(error.message as string);
        }
    }
)


const countrySlice = createSlice({
    name: "countries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountryThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCountryThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.countries = action.payload.results;
            })
            .addCase(fetchCountryThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default countrySlice.reducer;