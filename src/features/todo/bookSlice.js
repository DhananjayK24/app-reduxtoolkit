import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books : [],
    loading: true,
    searchTerm: 'game',
};

const bookSlice = createSlice({
    name: 'Book',
    initialState,
    reducers: {
        search_book : (state, {payload}) =>{
            console.log(payload);
            state.books = payload;
        },
        change_search : (state, {payload}) =>{
            state.searchTerm = payload;
        },
        change_loading : (state, {payload}) =>{
            console.log(payload);
            state.loading = payload;
        }
    }
});

export default bookSlice.reducer;
export const {search_book, change_search, change_loading} = bookSlice.actions;