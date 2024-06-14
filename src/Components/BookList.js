import React, { useEffect } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Loading from "./Loading";
import { search_book, change_loading } from "../features/todo/bookSlice";
import EachBook from "./EachBook";

const BookList = () =>{

    const dispatch = useDispatch();
    const Book = useSelector((state) => state.Book);
    const {loading, searchTerm, books} = Book;

    const fetchBooks = async () => {
         dispatch(change_loading(true));

        const response = await axios
        .get(`http://openlibrary.org/search.json?title=${searchTerm}`)
        .catch((err)=>{
            console.log("Err: ", err);
        });

        if(response.data.docs){
                const newBooks = response.data.docs.slice(0, 20).map((singleBook)=>{
                    const {key, author_name, cover_i, edition_count,
                           first_publish_year, title, ratings_average} = singleBook;
                    
                    return{
                        id: key,
                        author: author_name,
                        cover_id: cover_i,
                        edition_count: edition_count,
                        first_publish_year: first_publish_year,
                        title: title,
                        ratings_average: ratings_average
                    }
                });
                dispatch(search_book(newBooks));
        }

        
        dispatch(change_loading(false));
    };

    useEffect(()=>{
        fetchBooks();
    },[searchTerm]);

    console.log('books ', books);
      const eachBook = books.map((singlebook)=>{
        return{
            ...singlebook,
            id: (singlebook.id).replace("/works/", ""),
            cover_image: singlebook.cover_id ? `https://covers.openlibrary.org/b/id/${singlebook.cover_id}-L.jpg`
                                             : `https://www.shutterstock.com/image-vector/page-not-found-404-error-260nw-774749455.jpg`
        }
    });


    if(loading){
        return (
        <main className="grid grid-cols-4 gap-4 my-8 ml-3 justify-center" style={{marginLeft: '45px'}}>
        <Loading count={12} size={10}/>
        </main>
        )
    }

    return(
        <main className="grid grid-cols-4 gap-4 my-8 ml-3 justify-center" style={{marginLeft: '45px'}}>

        {
        eachBook?.slice(0, 30).map((item, index)=>{
            return (
                <EachBook key={index} {...item} />
            )
        })
        }
        </main>
    )
};

export default BookList;