import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import OrderApi from "./services/order-api";
import { RootState, store } from "@/app/store";
import { IInitStateShopping } from "@/models/shopping";

export const ORDER_SLICE: string = "OrderSlice";
export const GET_ORDERS: string = "/getOrders";
export const GET_ORDERS_BY_ID: string = "/getOrdersById";

const storage =
  typeof window !== "undefined" ? localStorage.getItem("u") : undefined;
const initialState: IInitStateShopping = {
  cartshopping: storage ?? {},
  error: false,
  loading: false,
};

export const getOrders = createAsyncThunk(GET_ORDERS, async () => {
  try {
    const response = await OrderApi.getOrders();
    return response.data;
  } catch (error: any) {}
});

export const getOrdersById = createAsyncThunk(GET_ORDERS_BY_ID, async (id : any) => {
    try {
      const response = await OrderApi.getOrderById(id);
      return response.data;
    } catch (error: any) {}
  });


const userSlice = createSlice({
  name: ORDER_SLICE,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Get cart */
    builder
      .addCase(getOrders.pending, (state, { payload }) => {})
      .addCase(getOrders.fulfilled, (state, { payload }) => {})
      .addCase(getOrders.rejected, (state, { payload }) => {})
  },
});

const { reducer, actions } = userSlice;
export const selectUser = (state: RootState) => state.user;
export default reducer;
