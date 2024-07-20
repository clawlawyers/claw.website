import { configureStore } from "@reduxjs/toolkit";
import authReducer, { userSlice } from "./features/auth/authSlice";
import gptReducer from "./features/gpt/gptSlice";
import cartReducer from "./features/cart/cartSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import popupReducer from "./features/popup/popupSlice";
import bookingsSlice from "./features/bookCourtRoom/selectedDatesTimesSlice"
import splashReducer from "./features/bookCourtRoom/splashSlice"
export default configureStore({
    reducer: {
        auth: authReducer,
        gpt: gptReducer,
        cart: cartReducer,
        sidebar: sidebarReducer,
        popup: popupReducer,
        bookings: bookingsSlice,
        splash: splashReducer,
        user:userSlice
    }
})