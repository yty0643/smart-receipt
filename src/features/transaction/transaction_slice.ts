import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITranItem{
    after_balance_amt: number,
    branch_name: string,
    inout_type: string,
    print_content: string,
    tran_amt: number,
    tran_date: string,
    tran_time: string,
    tran_type: string,
}

export interface ITransaction{
    tranList: ITranItem[];
    focusIdx: number,
    hideList: boolean[],
}

const initialState: ITransaction = {
    tranList: [],
    focusIdx: -1,
    hideList: [],
}

export const transactionSlice = createSlice({
    name: "selectedAcc",
    initialState,
    reducers: {
        setTranList: ((state, action) => {
            state.tranList = action.payload;
        }),
        setHideList: ((state, action) => {
            state.hideList = action.payload;
        }),
        mouseEnter: ((state, action) => {
            state.focusIdx = action.payload;
        }),
        mouseLeave: ((state, action) => {
            state.focusIdx = -1;
        }),
        mouseClick: ((state, action) => {
            const temp:boolean[] = [...state.hideList]
            temp[action.payload] = !temp[action.payload];
            state.hideList = temp;
        }),
    },
});

export const { setTranList, setHideList, mouseEnter, mouseLeave, mouseClick } = transactionSlice.actions;
export default transactionSlice.reducer;