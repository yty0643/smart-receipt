import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITranItem{
    after_balance_amt: string,
    branch_name: string,
    inout_type: string,
    print_content: string,
    tran_amt: string,
    tran_date: string,
    tran_time: string,
    tran_type: string,
}

export interface ITranList{
    list: ITranItem[];
}

const initialState: ITranList = {
    list: [],
}

export const tranListSlice = createSlice({
    name: "selectedAcc",
    initialState,
    reducers: {
        setTranList: ((state, action) => {
            state.list = action.payload;
        }),
    },
})

export const { setTranList } = tranListSlice.actions;
export default tranListSlice.reducer;