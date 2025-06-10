import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
    const token = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('userRole');
    
    // Pas de token = pas connecté
    if (!token) {
        return <Navigate to="/connexion" replace />;
    }
    
    // Pas admin = retour bibliothèque
    if (userRole !== '1') {
        alert('Accès non autorisé - Réservé aux administrateurs');
        return <Navigate to="/bibliotheque" replace />;
    }
    
    return children;
}

export default AdminRoute;