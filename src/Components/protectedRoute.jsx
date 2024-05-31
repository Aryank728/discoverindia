import React from 'react';
// import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import ErrorPage from '../Pages/errorPage';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // Redirect to error page if the user is not authenticated
        return <ErrorPage />;
    }

    if (currentUser.email !== "kumararyan1929@gmail.com") {
        // Redirect to error page if the user's email is not authorized
        return <ErrorPage />;
    }

    return children;
};

export default ProtectedRoute;
