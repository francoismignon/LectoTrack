import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('accessToken');
    
    // Si pas de token, rediriger vers la connexion
    if (!token) {
        return <Navigate to="/connexion" replace />;
    }
    
    // Si token présent, afficher le composant
    return children;
}

export default ProtectedRoute;