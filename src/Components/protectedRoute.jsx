import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // Redirect to login if the user is not authenticated
        return <Navigate to="/login" />;
    }

    if (currentUser.email !== "kumararyan1929@gmail.com") {
        // Redirect to home if the user's email is not authorized
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
