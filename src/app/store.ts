import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../features/theme/theme_slice';
import seletedReducer from '../features/selected/selected_slice';
import tranListReducer from '../features/tran_list/tran_list_slice';
import stateListReducer from '../features/state_list/state_list_slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    selected: seletedReducer,
    tranList: tranListReducer,
    stateList: stateListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;