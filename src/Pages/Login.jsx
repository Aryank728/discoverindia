import React, { useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../firebase';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import LottieAnimation from '../Components/animation';
import contactAnimation from '../asset/animation/Animation - login.json';
// import { useAuth } from '../Context/AuthContext';

const db = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AUTHORIZED_EMAIL = "kumararyan1929@gmail.com";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();
    // const { currentUser } = useAuth();

    const checkUserInDatabase = async (email) => {
        const userRef = ref(db, 'users');
        const snapshot = await get(userRef);
        const users = snapshot.val();
        const userEmails = users ? Object.values(users).map(user => user.email) : [];
        return userEmails.includes(email);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setAuthError('');

        try {
            if (email.endsWith('@gmail.com')) {
                const isUserPresent = await checkUserInDatabase(email);
                if (!isUserPresent) {
                    setAuthError('Invalid credentials.');
                    return;
                }
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedInEmail = userCredential.user.email;

            if (loggedInEmail === AUTHORIZED_EMAIL) {
                navigate('/dashboard');
            } if (loggedInEmail !== AUTHORIZED_EMAIL) {
                navigate('/');
            }

        } catch (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setAuthError('Invalid credentials.');
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
                setAuthError('Invalid credentials.');
                await auth.signOut();
                return;
            }

            if (email === AUTHORIZED_EMAIL) {
                navigate('/dashboard');
            }
            if (email !== AUTHORIZED_EMAIL) {
                navigate('/');
            }

        } catch (error) {
            console.log('Google sign-in error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center">
                <LottieAnimation animationData={contactAnimation} />
            </div>
            <Tilt
                className="tilt-container"
                options={{ max: 25, scale: 1.05 }}
                style={{ width: '100%', maxWidth: '400px' }}
            >
                <div className="p-8 bg-white rounded-lg shadow-lg">
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
                        </div>
                        {authError && <p className="text-red-500 text-xs italic mt-1">{authError}</p>}
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
            </Tilt>
        </div>
    );
}

export default LoginForm;
