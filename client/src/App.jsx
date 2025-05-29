import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookList from './pages/BookList';
import AddBookForm from './pages/AddBookForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/livres" element={<BookList />} />
        <Route path="/livres/ajouter" element={<AddBookForm />} />
        {/* <Route path="/livres/:id" element={<BookDetail />} /> */}
        {/* <Route path="/livres/:id/modifier" element={<EditBookForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
