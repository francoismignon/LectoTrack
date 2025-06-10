import { useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LibraryPage from './pages/LibraryPage';
import AddBookPage from './pages/AddBookPage';
import ReadingPage from './pages/ReadingPage';
import SummaryPage from './pages/SummaryPage';
import ModerationPage from './pages/ModerationPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Navigate to="/inscription" replace />} />
        <Route path="/inscription" element={<RegisterPage />}/>
        <Route path="/connexion" element={<LoginPage />}/>
        
        {/* Routes protégées - nécessitent une authentification */}
        <Route path="/bibliotheque" element={
          <ProtectedRoute>
            <LibraryPage />
          </ProtectedRoute>
        }/>
        <Route path="/AjoutLivre" element={
          <ProtectedRoute>
            <AddBookPage />
          </ProtectedRoute>
        }/>
        <Route path="/lecture/:id" element={
          <ProtectedRoute>
            <ReadingPage />
          </ProtectedRoute>
        }/>
        <Route path="/resume/:id" element={
          <ProtectedRoute>
            <SummaryPage />
          </ProtectedRoute>
        }/>
        
        {/* Route admin uniquement */}
        <Route path="/moderation" element={
          <AdminRoute>
            <ModerationPage />
          </AdminRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}
export default App