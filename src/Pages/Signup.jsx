import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, update, onValue, increment } from 'firebase/database';
import { app } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const db = getDatabase(app);
const auth = getAuth(app);

function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userRef = ref(db, 'userCounter/value');
        onValue(userRef, (snapshot) => {
            const data = snapshot.val() || 0;
            setUserId(data);
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError('Invalid email format.');
            return;
        } else {
            setEmailError('');
        }

        if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{8,}/.test(password)) {
            setPasswordError('Password must contain at least 8 characters with at least one number, one alphabet, and one special character.');
            return;
        } else {
            setPasswordError('');
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUserRef = ref(db, `users/${userId}`);
            await set(newUserRef, {
                id: userId,
                name: name,
                email: email,
                password: hashedPassword,
            });

            const userCounterRef = ref(db, 'userCounter');
            await update(userCounterRef, {
                value: increment(1),
            });

            setShowModal(true);
            setName('');
            setEmail('');
            setPassword('');

            // Sign out the user after successful signup
            await signOut(auth);

            // Hide the modal after 2 seconds and navigate to login page
            setTimeout(() => {
                setShowModal(false);
                navigate('/login');
            }, 2000);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setEmailError('Email is already in use. Please use a different email.');
            } else {
                alert(error.message);
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl font-semibold text-center">Signup</h2>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">Name:</label>
                        <input
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            required
                            placeholder="Enter Your Name"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
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
                        Signup
                    </button>
                </form>
                {showModal && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-green-500 text-lg font-semibold">Signup Successful!</p>
                        </div>
                    </div>
                )}
                <div className="mt-4 text-center">
                    <button onClick={() => navigate('/login')} className="text-blue-500 hover:underline">
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
