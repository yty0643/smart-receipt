import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../features/theme/themeSlice';
import seletedAccReducer from '../features/selected_acc/selected_acc_slice';
import tranListReducer from '../features/tran_list/tran_list_slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    selectedAcc: seletedAccReducer,
    tranList: tranListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;