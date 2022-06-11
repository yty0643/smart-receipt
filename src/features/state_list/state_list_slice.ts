import { createSlice } from '@reduxjs/toolkit';

export interface IStateList{
    hover: boolean[],
    hide: boolean[],
};

const initialState: IStateList = {
    hover: [],
    hide: [],
};

export const stateListSlice = createSlice({
    name: "stateList",
    initialState,
    reducers: {
        setStateList: ((state, action) => {
            state.hover = action.payload.hover;
            state.hide = action.payload.hide;
        }),
        mouseEnter: ((state, action) => {
            const temp:boolean[] = [...state.hover]
            temp[action.payload] = true;
            state.hover = temp;
        }),
        mouseLeave: ((state, action) => {
            const temp:boolean[] = [...state.hover]
            temp[action.payload] = false;
            state.hover = temp;
        }),
        mouseClick: ((state, action) => {
            const temp:boolean[] = [...state.hide]
            temp[action.payload] = !temp[action.payload];
            state.hide = temp;
        }),
    }
})

export const { setStateList, mouseEnter, mouseLeave, mouseClick } = stateListSlice.actions;
export default stateListSlice.reducer;