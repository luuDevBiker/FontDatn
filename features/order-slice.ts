import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import OrderApi from "./services/order-api";
import { RootState, store } from "@/app/store";
import { IInitStateShopping } from "@/models/shopping";

export const ORDER_SLICE: string = "OrderSlice";
export const GET_ORDERS: string = "/getOrders";
export const GET_ORDERS_BY_ID: string = "/getOrdersById";
export const GET_ORDERS_BY_PROFILE_ID: string = "/getOrdersByProfileIDId";
export const CONFIRM_ORDER: string = "/confirmOrder";
export const UPDATE_STATUS_ORDER: string = "/updateStatusOrder";
export const UPDATE_ORDER: string = "/updateOrder";
export const Delete_Item_ORDER: string = "/deleteItemOrder";


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

export const getOrdersProfileById = createAsyncThunk(GET_ORDERS_BY_PROFILE_ID, async (id : any) => {
  try {
    const response = await OrderApi.getOrderByProfileId(id);
    return response.data;
  } catch (error: any) {}
});

  export const confirmOrder = createAsyncThunk(GET_ORDERS_BY_ID, async (payload : any) => {
    try {
      const response = await OrderApi.confirmOrder(payload.Id,payload.Payload);
      return response.data;
    } catch (error: any) {}
  });

  export const updateStatusOrder = createAsyncThunk(UPDATE_STATUS_ORDER, async (payload : any) => {
    console.log("updateStatusOrder",payload);
    try {
      const response = await OrderApi.updateStatusOrder(payload.Id,payload.Payload);
      return response.data;
    } catch (error: any) {}
  });

  export const updateOrder = createAsyncThunk(UPDATE_ORDER, async (payload : any) => {
    console.log("updateOrder",payload);
    try {
      const response = await OrderApi.updateOrder(payload.Id,payload);
      return response.data;
    } catch (error: any) {}
  });

  export const deleteItemOrder = createAsyncThunk(Delete_Item_ORDER, async (payload : any) => {
    console.log("updateOrder",payload);
    try {
      const response = await OrderApi.deleteItemInOrder(payload.Id,payload.ProductVariantId);
      return response.data;
    } catch (error: any) {}
  });


const userSlice = createSlice({
  name: ORDER_SLICE,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state, { payload }) => {})
      .addCase(getOrders.fulfilled, (state, { payload }) => {})
      .addCase(getOrders.rejected, (state, { payload }) => {})
      .addCase(getOrdersById.pending, (state, { payload }) => {})
      .addCase(getOrdersById.fulfilled, (state, { payload }) => {})
      .addCase(getOrdersById.rejected, (state, { payload }) => {})
      .addCase(getOrdersProfileById.pending, (state, { payload }) => {})
      .addCase(getOrdersProfileById.fulfilled, (state, { payload }) => {})
      .addCase(getOrdersProfileById.rejected, (state, { payload }) => {})
      .addCase(confirmOrder.pending, (state, { payload }) => {})
      .addCase(confirmOrder.fulfilled, (state, { payload }) => {})
      .addCase(confirmOrder.rejected, (state, { payload }) => {})
      .addCase(updateStatusOrder.pending, (state, { payload }) => {})
      .addCase(updateStatusOrder.fulfilled, (state, { payload }) => {})
      .addCase(updateStatusOrder.rejected, (state, { payload }) => {})
  },
});

const { reducer, actions } = userSlice;
export const selectUser = (state: RootState) => state.user;
export default reducer;
