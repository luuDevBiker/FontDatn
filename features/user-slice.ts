import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userApi from "./services/user-api";
import type { RootState } from "@/app/store";
import { ICreateEmployees, IUserSignInPayload } from "@/models/user";

export const USER_SIGNIN: string = "auth/signin";
export const USER_SLICE_NAME: string = "user";
export const CREATEEMPLOYEES: string = "create_employees";
export const GET_CONFIGURATION: string = "configuration/get-configuration";

export const userSignIn = createAsyncThunk(
  USER_SIGNIN,
  async (payload: IUserSignInPayload, { rejectWithValue }) => {
    try {
      const response = await userApi.userSignIn(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      throw rejectWithValue(err.response.data);
    }
  }
);

export const createEmployees = createAsyncThunk(
  CREATEEMPLOYEES,
  async (payload: ICreateEmployees, { rejectWithValue }) => {
    try {
      const response = await userApi.CreateEmployees(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      throw rejectWithValue(err.response.data);
    }
  }
);

export const getConfigurations = createAsyncThunk(
  GET_CONFIGURATION,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await userApi.getConfigurations(payload);
      return response?.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
    }
  }
);

const initialState = {
  loginInfo: {},
};
const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Register */
    builder

      .addCase(userSignIn.pending, (state) => {
        //   state.loading = true;
      })
      .addCase(userSignIn.fulfilled, (state, { payload }) => {
        //   state.loading = false;
        //   state.loginInfo = payload as ILoginResponse;
        //   state.isAuthentication = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("u", JSON.stringify(payload));
        }
        state.loginInfo = payload;
        //   state.token=payload.Token
      })
      .addCase(userSignIn.rejected, (state, { payload }) => {
        //   state.loading = false;
        //   state.error = true;
        //   state.token=payload as ILoginResponseNotActive
      })

      .addCase(getConfigurations.pending, (state) => {
        //   state.loading = true;
      })
      .addCase(getConfigurations.fulfilled, (state, { payload }) => {
        //   state.loading = false;
        //   state.loginInfo = payload as ILoginResponse;
        //   state.isAuthentication = true;
        //   state.token=payload.Token
      })
      .addCase(getConfigurations.rejected, (state, { payload }) => {});
  },
});

const { reducer, actions } = userSlice;
export const selectUser = (state: RootState) => state.user;
export default reducer;
