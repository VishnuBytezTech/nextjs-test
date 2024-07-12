import { fetchUserList } from '@/api/users/usersApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BaseApi = process.env.NEXT_PUBLIC_API_URL || '';
const apiUrl = `${BaseApi}authentication/send-user-invitation/`;
const AcceptUserInviteUrl = `${BaseApi}authentication/accept-user-invitation/`;

interface User { 
  id: string;
  username: string;
  // country: string;
  // timezone: string;
}

interface UserState { 
  users: User[];
  count: number;
  next: string | null;
  previous: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: UserState = {
  users: [],
  count: 0,
  next: null,
  previous: null,
  loading: false,
  error: null,
  message: null

}

// async thunk for sending user invitation
export const sendUserInvitation = createAsyncThunk(
  'userInvitation/sendUserInvitation',
  async ({ authToken, email, role }: {authToken: string, email:string, role: string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrl, { email, role }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("User invitation response:", response.data);
      return response;
    } catch (error: any) {
      console.error("Error sending user invitation:", error);
      return rejectWithValue(error.response.data);
    }
  }
);


// async thunk for creating user invitation
export const createUserByInvitation = createAsyncThunk(
  'userInvitation/createUser',
  async ({ userData }: { userData: { user_invitation: string, first_name: string, last_name: string, password: string} }, { rejectWithValue }) => {
    try {
      console.log("User data:", userData);
      const response = await axios.post(AcceptUserInviteUrl, userData);
      console.log("User accepted invitation:", response.data);
      return response;
    } catch (error: any) {
      console.error("Error creating user by invitation:", error);
      if (error.response) {
        // Return the error response data and status
        return rejectWithValue({ data: error.response.data, status: error.response.status });
      } else {
        // Return a generic error message
        return rejectWithValue({ message: "An unexpected error occurred" });
      }
    }
  }
);


// Async thunk for user list
export const fetchUsersThunk = createAsyncThunk(
  'authentication/users',
  async ({ authToken, limit, offset }: { authToken: string; limit: number; offset: number }, { rejectWithValue }) => {
    try {
      console.log("Auth token from users list redux slice :::::::", authToken)
      const response = await fetchUserList(authToken, limit, offset)
      return response;
    } catch (error: any) {
      console.log("Client API is not working well error::", error);
      return rejectWithValue(error.message as string);
    }
  }
)

// Slice
const userInvitationSlice = createSlice({
  name: 'userInvitation',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.message = '';
      state.error = null;
      state.users = [];
      state.count = 0;
      state.next = null;
      state.previous = null;
      // state.usersLoading = false;
      // state.usersError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendUserInvitation.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = null;
      })
      .addCase(sendUserInvitation.fulfilled, (state, action) => {
        state.loading = false;
        // state.message = action.payload.message;
        state.error = null;
      })
      .addCase(sendUserInvitation.rejected, (state, action) => {
        state.loading = false;
        state.message = '';
        // state.error = action.payload || 'Error sending user invitation';
      })
      .addCase(createUserByInvitation.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = null;
      })
      .addCase(createUserByInvitation.fulfilled, (state, action) => {
        state.loading = false;
        // state.message = action.payload.message;
        state.error = null;
      })
      .addCase(createUserByInvitation.rejected, (state, action) => {
        state.loading = false;
        state.message = '';
        // state.error = action.payload || 'Error creating user by invitation';
      })
      // .addCase(fetchUsersThunk.pending, (state) => {
      //   state.usersLoading = true;
      //   state.usersError = null;
      // })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        // state.usersLoading = false;
        state.users = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        // state.usersError = null;
      })
      // .addCase(fetchUsersThunk.rejected, (state, action) => {
      //   state.usersLoading = false;
      //   state.usersError = action.payload || 'Error fetching users';
      // });
  },
});

export const { resetState } = userInvitationSlice.actions;

export default userInvitationSlice.reducer;
