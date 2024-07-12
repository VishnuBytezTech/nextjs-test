import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '@/api/authentication/loginApi';
import { RootState } from '../store';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Function to safely parse JSON from localStorage
// const parseStoredUser = (): User | null => {
//   const storedUser = localStorage.getItem('user');
//   return storedUser ? JSON.parse(storedUser) : null;
// };

// Initial state setup without accessing localStorage initially
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
};

type LoginThunk = ReturnType<typeof createAsyncThunk<
  { accessToken: string; refreshToken: string; user: User },
  { username: string; password: string },
  { rejectValue: string }
>>;

export const login: LoginThunk = createAsyncThunk<
  { accessToken: string; refreshToken: string; user: User },
  { username: string; password: string },
  { rejectValue: string }
>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await loginApi(username, password);
      const user: User = {
        id: response.user.id,
        name: response.user.username,
        email: response.user.email,
        role: response.user.role,
      };

      // Update localStorage only after successful login
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', response.access);
        localStorage.setItem('refreshToken', response.refresh);
        localStorage.setItem('user', JSON.stringify(user));
      }

      return {
        accessToken: response.access,
        refreshToken: response.refresh,
        user,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'An unknown error occurred');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
