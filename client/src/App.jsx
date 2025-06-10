import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LibraryPage from './pages/LibraryPage';
import AddBookPage from './pages/AddBookPage';
import ReadingPage from './pages/ReadingPage'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/inscription" element={<RegisterPage />}/>
        <Route path="/connexion" element={<LoginPage />}/>
        <Route path="/bibliotheque" element={<LibraryPage />}/>
        <Route path="/AjoutLivre" element={<AddBookPage />}/>
        <Route path="/lecture/:id" element={<ReadingPage />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App
