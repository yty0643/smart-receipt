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
    key: number,
    hover: boolean,
    hide: boolean,
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
        mouseEnter: ((state, action) => {
            const temp:ITranItem[] = [...state.list]
            temp[action.payload].hover = true;
            state.list = temp;
        }),
        mouseLeave: ((state, action) => {
            const temp:ITranItem[] = [...state.list]
            temp[action.payload].hover = false;
            state.list = temp;
        }),
        mouseClick: ((state, action) => {
            const temp:ITranItem[] = [...state.list]
            temp[action.payload].hide = !temp[action.payload].hide;
            state.list = temp;
        }),
    },
});

export const { setTranList, mouseEnter, mouseLeave, mouseClick } = tranListSlice.actions;
export default tranListSlice.reducer;