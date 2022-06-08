import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISelectedAccState{
    account: object;
}

const initialState: ISelectedAccState = {
    account: {},
}

export const selectedAccSlice = createSlice({
    name: "selectedAcc",
    initialState,
    reducers: {
        setAccount: ((state, action) => {
            state.account = action.payload;
        }),
    },
})

export const { setAccount } = selectedAccSlice.actions;
export default selectedAccSlice.reducer;