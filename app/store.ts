import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userSlice from '@/features/user-slice';
import wareHouseSlice from '@/features/warehouse-slice';
import productSlice from '@/features/product-slice';
import optionSlice from "@/features/option-slice";
const rootReducer = {
    user: userSlice,
    warehouse:wareHouseSlice,
    product:productSlice,
    option:optionSlice,
}
export const store = configureStore({
    reducer: rootReducer
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState,unknown,Action<string>>;