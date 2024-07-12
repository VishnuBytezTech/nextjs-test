import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { getPermissions, getPermissionDetail } from '../../api/permissions/permissionApi';
const createNewPermission = null

interface PermissionState {
  id: number;
  routeName: string;
  pageName: string;
  actions: string;
  status: boolean;
}

interface PermissionDetailState {
  permission: PermissionState | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface InitialState {
  permissions: PermissionState[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  permissionDetail: PermissionDetailState;
}

const initialState: InitialState = {
  permissions: [],
  status: 'idle',
  error: null,
  permissionDetail: {
    permission: null,
    status: 'idle',
    error: null,
  },
};

// Define the type for the thunk action creator
type FetchPermissionsThunk = AsyncThunk<PermissionState[], void, {}>;

export const fetchPermissions: FetchPermissionsThunk = createAsyncThunk(
  'permissions/fetchPermissions',
  async () => {
    const response = await getPermissions(); 
    return response; 
  }
);

export const fetchPermissionDetail = createAsyncThunk<PermissionState, number>(
  'permissions/fetchPermissionDetail',
  async (id: number) => {
    const response = await getPermissionDetail(id);
    console.log("permission detail :::: response ::::",response)
    return response;
  }
);
//////////////////////////

// export const createPermission = createAsyncThunk<PermissionState, PermissionState>(
//   'permissions/createPermission',
//   async (newPermission: PermissionState) => {
//     const response = await createNewPermission(newPermission); // Assuming createNewPermission is an API function to create a new permission
//     return response;
//   }
// );

///////////////////////////////

export const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    deletePermission: (state, action: PayloadAction<number>) => {
      console.log("delete the item::", action.payload);
      state.permissions = state.permissions.filter(permission => permission.id !== action.payload);
    },
    updatePermission: (state, action: PayloadAction<PermissionState>) => {
      const index = state.permissions.findIndex(permission => permission.id === action.payload.id);
      if (index !== -1) {
        state.permissions[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPermissions.fulfilled, (state, action: PayloadAction<PermissionState[]>) => {
        state.status = 'succeeded';
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch permissions';
      })
      .addCase(fetchPermissionDetail.pending, (state) => {
        state.permissionDetail.status = 'loading';
      })
      .addCase(fetchPermissionDetail.fulfilled, (state, action: PayloadAction<PermissionState>) => {
        state.permissionDetail.status = 'succeeded';
        state.permissionDetail.permission = action.payload;
      })
      .addCase(fetchPermissionDetail.rejected, (state, action) => {
        state.permissionDetail.status = 'failed';
        state.permissionDetail.error = action.error.message || 'Failed to fetch permission detail';
      });
  }
});

export const { deletePermission, updatePermission } = permissionSlice.actions;

export default permissionSlice.reducer;
