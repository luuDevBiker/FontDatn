import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ShoppingApi from "./services/shoping-api";
import { RootState, store } from "@/app/store";
import { IInitStateShopping } from "@/models/shopping";

export const SHOPPING_SLICE: string = "shoppingSlice";
export const ADD_TO_CARD: string = "shopping/addtocart";
export const DELETE_ITEM_CARD: string = "shopping/deletecart";
export const GET_CARD: string = "shopping/getcart";
export const PAYMENT: string = "shopping/payment";

const storage =
  typeof window !== "undefined" ? localStorage.getItem("u") : undefined;
const initialState: IInitStateShopping = {
  cartshopping: storage ?? {},
  error: false,
  loading: false,
};

export const addTocart = createAsyncThunk(ADD_TO_CARD, async (payload: any) => {

  try {
    const response = ShoppingApi.addItemToCard(payload.Id, payload);
    return response;
  } catch (error: any) {}
});

export const getCart = createAsyncThunk(GET_CARD, async (id: any) => {
  try {
    const response = await ShoppingApi.getListProduct(id);
    return response.data;
  } catch (error: any) {}
});

export const deleteItemInCart = createAsyncThunk(
  DELETE_ITEM_CARD,
  async (pay: any) => {
    try {
      const response = await ShoppingApi.deleteItemInCard(pay.key, pay.id);
      return response.data;
    } catch (error) {}
  }
);

export const payment = createAsyncThunk(PAYMENT, async (payload: any) => {

  try {
    const response = ShoppingApi.payment(payload.cartId, payload.payload);
    return response;
  } catch (error: any) {}
});

const userSlice = createSlice({
  name: SHOPPING_SLICE,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Get cart */
    builder
      .addCase(addTocart.pending, (state, { payload }) => {})
      .addCase(addTocart.fulfilled, (state, { payload }) => {})
      .addCase(addTocart.rejected, (state, { payload }) => {})
      .addCase(getCart.pending, (state, { payload }) => {})
      .addCase(getCart.fulfilled, (state, { payload }) => {})
      .addCase(getCart.rejected, (state, { payload }) => {})
      .addCase(deleteItemInCart.pending, (state, { payload }) => {})
      .addCase(deleteItemInCart.fulfilled, (state, { payload }) => {})
      .addCase(deleteItemInCart.rejected, (state, { payload }) => {})
      .addCase(payment.pending, (state, { payload }) => {})
      .addCase(payment.fulfilled, (state, { payload }) => {})
      .addCase(payment.rejected, (state, { payload }) => {});
  },
});

const { reducer, actions } = userSlice;
export const selectUser = (state: RootState) => state.user;
export default reducer;
