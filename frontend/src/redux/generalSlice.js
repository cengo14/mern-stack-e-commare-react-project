import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    keyword: "",
    openModal: false,
    signUp: true,

};


const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        getKeyword: (state, action) => {
            state.keyword = action.payload;
        },
        openModalFunc: (state) => {
            state.openModal = !state.openModal
        },
        setProductToUpdate: (state, action) => {
            state.productToUpdate = action.payload;
        },
        setSignUp: (state, action) => {
            state.signUp = action.payload
        }
    },



})
export const { getKeyword, openModalFunc, setProductToUpdate, setSignUp } = generalSlice.actions;
export default generalSlice.reducer;