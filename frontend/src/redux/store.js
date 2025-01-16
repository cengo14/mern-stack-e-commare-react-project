import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import generalSlice from "./generalSlice";

const store = configureStore({
    reducer: {
        products: productSlice,
        cart: cartSlice,
        user: userSlice,
        general: generalSlice
    },

})
export default store;
