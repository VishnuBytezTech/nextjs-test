// clientsSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchClients, createClientApi } from '@/api/clients/clientApi';

interface Client {
    id?: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    // country: {
    //     id: string;
    //     iso: string;
    //     name: string;
    // };
}



interface ClientsState {
    clients: Client[];
    count: number;
    next: string | null;
    previous: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: ClientsState = {
    clients: [],
    count: 0,
    next: null,
    previous: null,
    loading: false,
    error: null,
};

export const fetchClientsThunk = createAsyncThunk(
    'clients/fetchClients',
    async ({ authToken, limit, offset }: { authToken: string; limit: number; offset: number }, { rejectWithValue }) => {
      console.log("access token form redux slice client ::::", authToken)
        try {
            const clientsResponse = await fetchClients(authToken, limit, offset);
            return clientsResponse;
        } catch (error: any) {
            console.log("Client API is not working well error::", error);
            return rejectWithValue(error.message as string);
        }
    }
);

export const fetchAllClientsThunk = createAsyncThunk(
    'clients/fetchAllClients',
    async ({ authToken }: { authToken: string }, { rejectWithValue }) => {
        console.log("access token form redux slice client (fetch all) ::::", authToken)
        try {
            let allClients: Client[] = [];
            let currentOffset = 0;
            const limit = 100;  // Adjust the limit as needed
            let moreDataAvailable = true;

            while (moreDataAvailable) {
                const response = await fetchClients(authToken, limit, currentOffset);
                allClients = allClients.concat(response.results);
                currentOffset += limit;

                if (response.next === null) {
                    moreDataAvailable = false;
                }
            }


            return {
                count: allClients.length,
                next: null,
                previous: null,
                results: allClients,
            };
        } catch (error: any) {
            console.log("Client API (fetch all) is not working well error::", error);
            return rejectWithValue(error.message as string);
        }
    }
);



export const createClientThunk = createAsyncThunk<
  { data: Client | null; status: number },
  { clientData: Client; accessToken: string },
  { rejectValue: { data: null; status: number; message: string } }
>(
  'clients/createClient',
  async ({ clientData, accessToken }, { rejectWithValue }) => {
    try {
      const response = await createClientApi(accessToken, clientData);
      console.log("Return value :::::::", response);
      return { data: response, status: 201 };
    } catch (error: any) {
      if (error.response) {
        // Handle specific status codes with rejectWithValue
        if (error.response.status === 400) {
          return rejectWithValue({
            data: null,
            status: 400,
            message: 'Bad request: Invalid client data'
          });
        } else {
          return rejectWithValue({
            data: null,
            status: error.response.status,
            message: `Error: ${error.response.statusText}`
          });
        }
      } else {
        // Handle network errors or other issues
        console.error("Error occurred in create client thunk:", error);
        return rejectWithValue({
          data: null,
          status: 500,
          message: error.message || 'Failed to create client'
        });
      }
    }
  }
);





const clientsSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClientsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchClientsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createClientThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createClientThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 201 && action.payload.data) {
                    state.clients.push(action.payload.data);
                }
            })
            .addCase(createClientThunk.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.payload as string;
            })

            .addCase(fetchAllClientsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllClientsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
            })
            .addCase(fetchAllClientsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default clientsSlice.reducer;
