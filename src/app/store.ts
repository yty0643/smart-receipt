import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../features/theme/themeSlice';
import seletedAccReducer from '../features/selectedAcc/selectedAccSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    selectedAcc: seletedAccReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;