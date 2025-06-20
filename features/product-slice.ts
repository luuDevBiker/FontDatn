import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productApi from "./services/product-api";
import type { RootState } from "@/app/store";
import { ICategory, IProduct } from "@/models/product";

export const GET_PRODUCT: string = "product/get_product";
export const ADD_PRODUCT: string = "product/add_product";
export const UPDATE_PRODUCT: string = "product/update_product";
export const GET_DETAILS: string = "product/get_details";
export const CREATE_CATEGORIES: string = "product/create_category";
export const UPDATE_CATEGORIES: string = "product/update_category";
export const GET_CATEGORIES: string = "product/get_categories";
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
  async (payload: IProduct, { rejectWithValue }) => {
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

export const updateProduct = createAsyncThunk(
  UPDATE_PRODUCT,
  async (payload: IProduct, { rejectWithValue }) => {
    try {
      const response = await productApi.updateProduct(payload.Id, payload);
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
      const response = await productApi.getProductDetails(obj.id, obj.key);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      throw rejectWithValue(err.response.data);
    }
  }
);

export const cateCategories = createAsyncThunk(
  CREATE_CATEGORIES,
  async (obj: ICategory, { rejectWithValue }) => {
    try {
      const response = await productApi.createCategory(obj);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      throw rejectWithValue(err.response.data);
    }
  }
);

export const updateCategories = createAsyncThunk(
  UPDATE_CATEGORIES,
  async (obj: ICategory, { rejectWithValue }) => {
    try {
      const response = await productApi.updateCategory(obj);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      throw rejectWithValue(err.response.data);
    }
  }
);

export const getCategories = createAsyncThunk(GET_CATEGORIES, async () => {
  try {
    const response = await productApi.getlistCategory();
    return response.data;
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
  }
});

const initialState = {
  productDetails: {},
  categories: [],
  products: [],
  loadding: false,
  error: false,
};
const productSlice = createSlice({
  name: PRODUCt,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Register */
    builder
      .addCase(getListProduct.pending, (state) => {
        state.loadding = true;
      })
      .addCase(getListProduct.fulfilled, (state, { payload }) => {
        state.loadding = false;
        state.products = payload.Payload;
      })
      .addCase(getListProduct.rejected, (state, { payload }) => {
        state.loadding = false;
        state.error = true;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.loadding = true;
      })
      .addCase(addNewProduct.fulfilled, (state, { payload }) => {
        state.loadding = false;
      })
      .addCase(addNewProduct.rejected, (state, { payload }) => {
        state.loadding = false;
        state.error = true;
      })
      .addCase(getCategories.pending, (state) => {
        state.loadding = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.loadding = false;
        state.categories = payload.payload;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.loadding = false;
        state.error = true;
      })
      .addCase(cateCategories.pending, (state) => {
        state.loadding = true;
      })
      .addCase(cateCategories.fulfilled, (state, { payload }) => {
        state.loadding = false;
      })
      .addCase(cateCategories.rejected, (state, { payload }) => {
        state.loadding = false;
        state.error = true;
      })
      .addCase(updateCategories.pending, (state) => {
        state.loadding = true;
      })
      .addCase(updateCategories.fulfilled, (state, { payload }) => {
        state.loadding = false;
      })
      .addCase(updateCategories.rejected, (state, { payload }) => {
        state.loadding = false;
        state.error = true;
      });
  },
});

const { reducer, actions } = productSlice;
export const selectProduct = (state: RootState) => state.product;
export default reducer;
