import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import optionApi from "./services/option-api";
import { RootState } from "@/app/store";
import { IOptionState, IOption } from "@/models/product";

export const OPTION_SLICE: string = "optionSlice";
export const GET_OPTION: string = "getOption";

export const getOptions = createAsyncThunk(GET_OPTION, async () => {
  try {
    const response = await optionApi.getOptions();
    return response.data;
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
  }
});

const initialState : IOptionState = {
  options: [],
  error: false,
  loadding: false,
};

const optionSlice = createSlice({
  name: OPTION_SLICE,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOptions.pending, (state) => {
        state.loadding = true;
      })
      .addCase(getOptions.fulfilled, (state, { payload }) => {
        state.loadding = false;
        state.options = payload.Payload;
      })
      .addCase(getOptions.rejected, (state, { payload }) => {
        state.loadding = false;
        state.error = true;
      });
  },
});

const { reducer, actions } = optionSlice;
export const selectOption = (state: RootState) => state.option;
export default reducer;
