import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userApi from "./services/user-api";
import { RootState, store } from "@/app/store";
import { IInitStateShopping } from "@/models/shopping";

export const SHOPPING_SLICE: string = "shoppingSlice";
export const ADD_TO_CARD: string = "shopping/addtocart";

export const addTocart = createAsyncThunk(ADD_TO_CARD, async () => {});
const storage =
  typeof window !== "undefined"
    ? localStorage.getItem("shoppingcart")
    : undefined;
const initialState: IInitStateShopping = {
  cartshopping: storage ?? {},
  error: false,
  loading: false,
};

const userSlice = createSlice({
  name: SHOPPING_SLICE,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Register */
    builder
      .addCase(addTocart.pending, (state) => {
        //   state.loading = true;
      })
      .addCase(addTocart.fulfilled, (state, { payload }) => {
        //   state.loading = false;
        //   state.loginInfo = payload as ILoginResponse;
        //   state.isAuthentication = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("u", JSON.stringify(payload));
        }
        //   state.token=payload.Token
      })
      .addCase(addTocart.rejected, (state, { payload }) => {
        //   state.loading = false;
        //   state.error = true;
        //   state.token=payload as ILoginResponseNotActive
      });
  },
});

const { reducer, actions } = userSlice;
export const selectUser = (state: RootState) => state.user;
export default reducer;
