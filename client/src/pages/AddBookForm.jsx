import React, { useState } from "react";
import '../styles/AddBookForm.css';
import axios from 'axios';
import { Navigate } from "react-router-dom";

function AddBookForm() {

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  async function handleSearch() {
    try {
      const response = await axios.get("https://openlibrary.org/search.json", {
        params: { title }
      });
      setBookSearch(response.data.docs);
      console.log(response.data.docs);


    } catch (error) {
      console.log(error.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      axios.post('http://localhost:3000/api/books', {
        title,
        firstName,
        lastName
      });
      setTitle("");
      setFirstName("");
      setLastName("");
      Navigate("/BookDetail");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <form className="book-form" onSubmit={handleSubmit}>
  <h2>Ajouter un livre</h2>
  <label>
    Titre :
    <input
      onChange={(e) => setTitle(e.target.value)}
      value={title}
      type="text"
      placeholder="Ex: Les Misérables"
      required
    />
  </label>

  <label>
    Prénom de l'auteur :
    <input
      onChange={(e) => setFirstName(e.target.value)}
      value={firstName}
      type="text"
      placeholder="Ex: Victor"
      required
    />
  </label>

  <label>
    Nom de l'auteur :
    <input
      onChange={(e) => setLastName(e.target.value)}
      value={lastName}
      type="text"
      placeholder="Ex: Hugo"
      required
    />
  </label>
  
  <button type="submit">Ajouter</button>
</form>
    </div>
  );
}
export default AddBookForm;