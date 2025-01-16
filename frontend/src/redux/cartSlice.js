import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
    let cart = localStorage.getItem("cart")
    if (cart) {
        return JSON.parse(cart);
    } else {
        return []
    }
}
const storeInLocalStorage = (data) => {
    localStorage.setItem("cart", JSON.stringify(data))
}
const initialState = {
    cart: fetchFromLocalStorage(),
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isItemCart = state.cart.find((cart) => cart.id === action.payload.id)
            if (isItemCart) {
                const tempCart = state.cart.map((item) => {
                    if (item.id === action.payload.id) {
                        let tempQuantity = item.quantity + action.payload.quantity
                        return {
                            ...item, quantity: tempQuantity,
                        }
                    } else {
                        return item
                    }
                })
                state.cart = tempCart
                storeInLocalStorage(state.cart)
            } else {
                state.cart.push(action.payload)
                storeInLocalStorage(state.cart)
            }
        },
        removeFromCart: (state, action) => {
            console.log(action.payload);

            const tempCart = state.cart.filter((cart) => cart.id !== action.payload)
            state.cart = tempCart
            storeInLocalStorage(state.cart)
        },
        clearCart: (state, action) => {
            state.cart = []
            storeInLocalStorage(state.cart)
        }
    },


})
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;