import React from "react";
import SearchForm from "../Components/SearchForm";
import BookList from "../Components/BookList";

const Home = () =>{
    return (
        <main className="bg-black">
        <SearchForm />
        <BookList />
        </main>
    )
};

export default Home;