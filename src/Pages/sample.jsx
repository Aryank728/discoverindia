import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Sample = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/'); // Redirect to the homepage or login page after logout
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    return (
        <div>
            Hello, you're logged in with Google Provider <br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Sample;
