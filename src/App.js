import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import BookList from "./Components/BookList";
import SingleBook from "./Pages/SingleBook";


function App() {
   return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="home" element={<Home />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<Signup />} />
        <Route exact path="book" element={<BookList />} />
        <Route exact path="/book/:id" element={<SingleBook />} />
      </Routes>
    </Router>
  );
}

export default App;