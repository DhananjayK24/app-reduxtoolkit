import React from "react";

import { useParams, Link } from "react-router-dom";

import Loading from "../Components/Loading";
import Ratings from "../Components/Ratings";

const URL = "https://openlibrary.org/works/";

const SingleBook = () =>{
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [books, setBooks] = React.useState(null);

    
    React.useEffect(() => {
    setLoading(true);
    async function getBooks() {
     try{
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();

        console.log(data);

        if(data){
          const {description, title, covers, subject_places, subject_times, subjects} = data;
          const newBook = {
            description: description ? description.value || description: "No Record Found",
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : `https://www.shutterstock.com/image-vector/page-not-found-404-error-260nw-774749455.jpg`,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times : subject_times ? subject_times.join(", ") : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found"
          };
          setBooks(newBook);
        } else {    
          setBooks(null);
        }
          setLoading(false);
        } catch(error){
            console.log(error);
            setLoading(false);
        }
    }
    getBooks();
  }, [id]);
    
    
    if(loading) {
        return (
        <div className="flex justify-center"> 
          <Loading count={1} size={80}/>
        </div>
        )
    }

    if(!books) {
    return <h2>No book to display</h2>;
    } 
    else {
        const {description, title, cover_img} = books;
        return(     
            <div className="flex justify-center items-center" > 

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="p-8 rounded-t-lg w-96 h-96" src={cover_img} alt="product image" />
            </a>
            <div className="mx-2 px-5 pb-5"> 
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Description: {description.split('.').slice(0,5).join('.') + '.'}</span>
            </div>
        </div>

            </div>
        )   
    } 
};

export default SingleBook;