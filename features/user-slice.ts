import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userApi from "./services/user-api";
import type { RootState } from "@/app/store";
import {
  IInitialUserState,
  ILoginResponse,
  IRegisterResponse,
  IUserRegister,
  IUserSignInPayload,
} from "@/models/user";
export const USER_SIGNIN: string = "auth/signin";
export const USER_SLICE_NAME: string = "user";
export const LOGOUT = "user/logout";
export const CONFIRM_OTP = "user/confirm-otp";
export const USER_REGISTER: string = "user/register";
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
export const logout = createAsyncThunk(LOGOUT, async () => {
  return true;
});
export const userRegister = createAsyncThunk(
  USER_REGISTER,
  async (payload: IUserRegister, { rejectWithValue }) => {
    try {
      const response = await userApi.userRegister(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      throw rejectWithValue(err.response.data);
    }
  }
);

export const userConfirmOtp = createAsyncThunk(
  CONFIRM_OTP,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await userApi.userConfirmOtp(payload);
      return response?.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
    }
  }
);

export const userForgotPassword = createAsyncThunk(
  CONFIRM_OTP,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await userApi.userForgotPassword(payload);
      return response?.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
    }
  }
);

const storage =
  typeof window !== "undefined" ? localStorage.getItem("u") : undefined;
const initialState: IInitialUserState = {
  loginInfo: storage
    ? (JSON.parse(storage) as ILoginResponse)
    : ({} as ILoginResponse),
  register: {} as IRegisterResponse,
  sendOtp: {} as ILoginResponse,
  otp: null,
  loadding: false,
  error: false,
  newRefreshToken: {} as ILoginResponse,
  isAuthentication: storage ? true : false,
  token: "",
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Register */
    builder
      .addCase(userRegister.pending, (state) => {
          state.loadding = true;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.loadding = false;
        state.isAuthentication = true;
        state.register = payload
        console.log(payload);
        
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.loadding = false;
        state.error = true;
      })
      .addCase(userSignIn.pending, (state) => {
          state.loadding = true;
      })
      .addCase(userSignIn.fulfilled, (state, { payload }) => {
        state.loadding = false;
        state.loginInfo = payload.Payload as ILoginResponse;
        state.isAuthentication = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("u", JSON.stringify(payload));
        }
        state.loginInfo = payload;
        state.token = payload.Token;
      })
      .addCase(userSignIn.rejected, (state, { payload }) => {
        state.loadding = false;
        state.error = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.isAuthentication = false;
        state.loadding = false;
        state.loginInfo = {} as ILoginResponse;
        if (typeof window !== "undefined") {
          localStorage.clear();
        }
      })
  },
});

const { reducer, actions } = userSlice;
export const selectUser = (state: RootState) => state.user;
export default reducer;
