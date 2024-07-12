import { fetchUserProfileApi } from "@/api/authentication/userProfileApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Profile {
  id: string;
  username: string;
  email: string;
  role: string;
  timezone: string;
  country: string;
  bio: string;
}

interface UserProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchUserProfileThunk = createAsyncThunk(
  'user-profile/fetchProfile',
  async ({ authToken }: { authToken: string }, { rejectWithValue }) => {
    console.log("Access token from fetch profile thunk :::", authToken);
    try {
      const response = await fetchUserProfileApi(authToken);
      return response;
    } catch (error: any) {
      console.log("User profile API is not working well error::", error);
      return rejectWithValue(error.message as string);
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userProfileSlice.reducer;
