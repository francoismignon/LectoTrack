import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function BookList(){

    const [books, setBooks] = useState([]);
    
    useEffect(()=>{
        axios
            .get("http://localhost:3000/api/books")
            .then(res=>{
                setBooks(res.data.message);
            });
    }, []);

    return (
        <h1>{books}</h1>
    );
}
export default BookList;