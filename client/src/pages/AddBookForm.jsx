import React, { useState } from "react";
import '../styles/AddBookForm.css';
import axios from 'axios';

function AddBookForm() {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bookSearch, setBookSearch] = useState([]);

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
        author
      });
      // setTitle("");
      // setAuthor("");
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
        <button type="submit" onClick={handleSearch}>Chercher</button>

        <label>
          Auteur :
          <input
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            type="text"
            placeholder="Ex: Victor Hugo"
            required
          />
        </label>
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {bookSearch.map((book) => (
        <li>{book.title} {book.author_name.map(author => {author})}</li>
        
        ))}
        
      </ul>
    </div>
  );
}
export default AddBookForm;