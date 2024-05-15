import React, { useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../firebase';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const db = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const checkUserInDatabase = async (email) => {
        const userRef = ref(db, 'users');
        const snapshot = await get(userRef);
        const users = snapshot.val();
        const userEmails = users ? Object.values(users).map(user => user.email) : [];
        return userEmails.includes(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (email.endsWith('@gmail.com')) {
                const isUserPresent = await checkUserInDatabase(email);
                if (!isUserPresent) {
                    setEmailError('Gmail user not found in the database.');
                    return;
                }
            }

            await signInWithEmailAndPassword(auth, email, password);
            navigate('/hi');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setEmailError('User not found.');
            } else if (error.code === 'auth/wrong-password') {
                setPasswordError('Incorrect password.');
            } else {
                alert(error.message);
            }
        }
    };

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const email = result.user.email;
            const isUserPresent = await checkUserInDatabase(email);
            if (!isUserPresent) {
                setEmailError('Gmail user not found in the database.');
                await auth.signOut();
                return;
            }
            navigate('/hi');
        } catch (error) {
            console.log('Google sign-in error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl font-semibold text-center">Login</h2>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">Email:</label>
                        <input
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            required
                            placeholder="Enter Your Email"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        {emailError && <p className="text-red-500 text-xs italic mt-1">{emailError}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">Password:</label>
                        <input
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            required
                            placeholder="Enter Your Password"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        {passwordError && <p className="text-red-500 text-xs italic mt-1">{passwordError}</p>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Login
                    </button>
                </form>
                <button type="button" onClick={loginWithGoogle} className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
                    Sign in with Google
                </button>
                <div className="mt-4 text-center">
                    <button onClick={() => navigate('/signup')} className="text-blue-500 hover:underline">
                        Don't have an account? Signup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
