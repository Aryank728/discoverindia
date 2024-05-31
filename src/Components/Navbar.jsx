/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useHistory } from 'react-router-use-history';
import { HiMenuAlt3 } from "react-icons/hi";
import { useAuth } from '../Context/AuthContext';
import logo from "../asset/DOC-20240518-WA0004.png"; // Ensure this path is correct

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false); // New state for showing login pop-up
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const handleDropdownToggle = () => {
        setDropdown(prevState => !prevState);
    };

    const handleAuthClick = () => {
        if (currentUser) {
            logout();
        } else {
            history.push('/login');
        }
    };

    const handleAddNewClick = () => {
        if (!currentUser) {
            setShowLoginPopup(true); // Show the login pop-up if user is not logged in
        } else {
            history.push('/placeform');
        }
    };

    return (
        <nav className="w-full h-24 flex flex-col justify-center items-center bg-transparent sticky z-20">
            <div className="container">
                <div className="lg:w-full w-11/12 mx-auto h-full flex justify-between items-center">
                    <div className="flex flex-col gap-y-4 w-full lg:w-1/3">
                        <span className="flex justify-center lg:justify-start gap-x-2 font-bold text-2xl w-full">
                            <a href="/" className="font-popoppins text-3xl font-bold text-[#ce8a5c]">
                                <img src={logo} alt="Tour India Logo" className="h-20 mx-auto lg:mx-0 mx-center" />
                            </a>
                        </span>
                    </div>
                    {/* Toggle menu for small screens */}
                    <HiMenuAlt3 className="lg:hidden text-black text-[22px] cursor-pointer" onClick={handleDropdownToggle} />
                    <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden text-yellow-500">
                        <a href="/" className="leading-normal text-lg no-underline text-white">Home</a>
                        <a href="/constitution" className="leading-normal text-lg no-underline text-white">Constitution</a>
                        <a href="/about" className="leading-normal text-lg no-underline text-white">About Us</a>
                        <a href="/contact" className="leading-normal text-lg no-underline text-white">Contact Us</a>
                        <a onClick={handleAddNewClick} className="leading-normal text-lg no-underline text-white cursor-pointer">Add New</a>
                        <button
                            onClick={handleAuthClick}
                            className="leading-normal text-lg no-underline text-white bg-[#F2B705] px-4 py-2 rounded"
                        >
                            {currentUser ? 'Logout' : 'Login'}
                        </button>
                    </ul>
                </div>

                {dropdown && (
                    <div onClick={handleDropdownToggle} className="lg:hidden w-full h-full fixed top-24 backdrop-blur-lg bg-cover ease-in-out duration-100 bg-transparent">
                        <div className="w-full h-[320px] flex-col items-baseline pt-8 gap-4">
                            <ul className="text-center p-0 flex flex-col justify-center w-full gap-y-8 text-yellow-500">
                                <a href="/" className="leading-normal text-lg no-underline text-white">Home</a>
                                <a href="/constitution" className="leading-normal text-lg no-underline text-white">Constitution</a>
                                <a href="/about" className="leading-normal text-lg no-underline text-white">About Us</a>
                                <a href="/contact" className="leading-normal text-lg no-underline text-white">Contact Us</a>
                                <a onClick={handleAddNewClick} className="leading-normal text-lg no-underline text-white cursor-pointer">Add New</a>
                                <button
                                    onClick={handleAuthClick}
                                    className="leading-normal text-lg no-underline text-white bg-[#F2B705] px-4 py-2 rounded"
                                >
                                    {currentUser ? 'Logout' : 'Login'}
                                </button>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            {/* Login pop-up */}
            {showLoginPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-semibold text-blue-500">Please login to add a new place</h3>
                        <button onClick={() => setShowLoginPopup(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Close</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
