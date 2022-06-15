import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../features/theme/theme_slice';
import seletedReducer from '../features/selected/selected_slice';
import transactionReducer from '../features/transaction/transaction_slice';
import categoryListReducer from '../features/category_list/category_list_slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    selected: seletedReducer,
    transaction: transactionReducer,
    categoryList: categoryListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;