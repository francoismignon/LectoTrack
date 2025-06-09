import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import('./styles/style.css');
import RegisterPage from './pages/RegisterPage'
import Footer from './components/Footer';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
