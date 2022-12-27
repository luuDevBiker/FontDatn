import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productApi from "./services/product-api";
import type { RootState } from "@/app/store";
import { IAddProduct } from "@/models/product";

export const GET_PRODUCT: string = "product/get_product";
export const ADD_PRODUCT: string = "product/add_product";
export const GET_DETAILS: string = "product/get_details";
export const PRODUCt: string = "productSLice";

export const getListProduct = createAsyncThunk(GET_PRODUCT, async () => {
  try {
    const response = await productApi.getListProduct();
    return response.data;
  } catch (err: any) {
    if (!err.response) {
      throw err.response;
    }
  }
});

export const addNewProduct = createAsyncThunk(
  ADD_PRODUCT,
  async (payload: IAddProduct, { rejectWithValue }) => {
    try {
      const response = await productApi.addProduct(payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      throw rejectWithValue(err.response.data);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  GET_DETAILS,
  async (obj: any, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductDetails(obj.id,obj.key);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      throw rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  productDetails: {},
};
const productSlice = createSlice({
  name: PRODUCt,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Register */
    builder

      .addCase(addNewProduct.pending, (state) => {
        //   state.loading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, { payload }) => {
        //   state.loading = false;
      })
      .addCase(addNewProduct.rejected, (state, { payload }) => {
        //   state.loading = false;
        //   state.error = true;
        //   state.token=payload as ILoginResponseNotActive
      });
  },
});

const { reducer, actions } = productSlice;
// export const selectUser = (state: RootState) => state.user;
export const selectProduct = (state: RootState) => state.product;

export default reducer;
