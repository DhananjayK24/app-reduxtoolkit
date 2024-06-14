import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./features/todo/bookSlice";


export const store = configureStore({
    reducer: {
        Book: bookSlice,
    }
});