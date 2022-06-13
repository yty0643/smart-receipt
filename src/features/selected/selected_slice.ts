import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISelectedAccState{
    account: object;
    category: { [key: string]: number[] };
};

const initialState: ISelectedAccState = {
    account: {},
    category: {},
};

export const selectedAccSlice = createSlice({
    name: "selectedAcc",
    initialState,
    reducers: {
        setAccount: ((state, action) => {
            state.account = action.payload;
        }),
        selectCategory: ((state, action) => {
            state.category = action.payload;
        }),
    },
})

export const { setAccount, selectCategory } = selectedAccSlice.actions;
export default selectedAccSlice.reducer;