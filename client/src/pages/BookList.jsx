import React, { useEffect, useState } from "react";
import axios from 'axios';
import BookCard from "../components/BookCard";

function Dashboard(){
    const [books, setBooks] = useState([]);

    useEffect(()=>{
         axios.get('http://localhost:3000/api/books')
            .then(res=>setBooks(res.data))
    },[]);

    return (
        books.map(book => (
            <BookCard
                book={book} 
            />
        ))
    );
}
export default Dashboard;