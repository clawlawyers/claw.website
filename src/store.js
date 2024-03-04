import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const config = {
    key: "root",
    storage
}

const presistedUserReducer = persistReducer(config, userReducer);

export default configureStore({
    reducer: {
        user: presistedUserReducer
    }
})