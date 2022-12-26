import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import wareHouseApi from "./services/ware-house-api";
import { RootState, store } from '@/app/store';
import { IInitStateShopping } from "@/models/shopping";
import { IGetDeliveryByID } from "@/models/warehouse";


    export const WAREHOUSE_SLICE:string='warehouseSlice'
    export const GET_ALL_TRANSFERS:string = 'warehouse/getalltransfer'
    export const GET_TRANSFERS_BY_ID:string = 'warehouse/getalltransferByID'


    export const getAllTransfer = createAsyncThunk(GET_ALL_TRANSFERS, async () => {
        try{
          const response = await wareHouseApi.getListProduct()
          return response.data
        } catch (err:any) {
          if (!err.response) {
            throw err
          }
            
          }
    })

    export const getDeliveryById = createAsyncThunk(GET_TRANSFERS_BY_ID, async (payload: IGetDeliveryByID, { rejectWithValue }) => {
      try{
        const response = await wareHouseApi.getListDeliveryDetailById(payload)
        return response.data
      } catch (err:any) {
        if (!err.response) {
          throw err
        }
          throw rejectWithValue(err.response.data)
        }
    })
    const storage = typeof window !== 'undefined' ? localStorage.getItem('shoppingcart') : undefined
    const initialState:IInitStateShopping = {
        cartshopping:storage?? {},
        error:false,
        loading:false
    }

    const wareHouseSlice = createSlice( {
        name: WAREHOUSE_SLICE,
        initialState:initialState,
        reducers:{
        },
        extraReducers: builder => {
          /* Register */    
          builder
          
    
    
    
        .addCase(getAllTransfer.pending, state => {
        //   state.loading = true;
        })
        .addCase(getAllTransfer.fulfilled, (state, { payload }) => {
        //   state.loading = false;
        //   state.loginInfo = payload as ILoginResponse;
        //   state.isAuthentication = true;
        //   state.token=payload.Token
        })
        .addCase(getAllTransfer.rejected, (state, {payload}) => {
        //   state.loading = false;
        //   state.error = true;
        //   state.token=payload as ILoginResponseNotActive
        })   

        .addCase(getDeliveryById.pending, state => {
          //   state.loading = true;
          })
          .addCase(getDeliveryById.fulfilled, (state, { payload }) => {
          })
          .addCase(getDeliveryById.rejected, (state, {payload}) => {
          //   state.loading = false;
          //   state.error = true;
          //   state.token=payload as ILoginResponseNotActive
          }) 
        }
    });
    
      const { reducer, actions } = wareHouseSlice;
    export const selectUser = (state: RootState) => state.user;
    export default reducer;
