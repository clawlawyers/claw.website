import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import gptReducer from "./features/gpt/gptSlice";
import cartReducer from "./features/cart/cartSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        gpt: gptReducer,
        cart: cartReducer
    }
})