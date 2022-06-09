import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IThemeState {
  isActive: boolean;
  msg: string;
}

const initialState: IThemeState = {
  isActive: false,
  msg: "",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isActive = !state.isActive;
    },
  },
});

export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;