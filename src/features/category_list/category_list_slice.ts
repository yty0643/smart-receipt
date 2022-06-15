import { ITranItem } from '../transaction/transaction_slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICategoryItem{
    [key: string]: ITranItem[];
}

export interface ICategoryList{
    list: ICategoryItem[];
}

const initialState: ICategoryList = {
    list: [],
}

export const categoryListSlice = createSlice({
    name: "selectedAcc",
    initialState,
    reducers: {
        setCategoryList: ((state, action) => {
            state.list = action.payload;
        }),
    },
});

export const { setCategoryList } = categoryListSlice.actions;
export default categoryListSlice.reducer;