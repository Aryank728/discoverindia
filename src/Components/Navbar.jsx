import React, { useState } from 'react';
import { useHistory } from 'react-router-use-history';
import { HiMenuAlt3 } from "react-icons/hi";
import { useAuth } from '../Context/AuthContext';
import logo from "../asset/DOC-20240518-WA0004.png"; // Ensure this path is correct

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
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

    return (
        <nav className="w-full h-24 flex flex-col justify-center items-center bg-transparent sticky top-0 z-20">
            <div className="container mx-auto lg:px-6">
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
                        <button
                            onClick={handleAuthClick}
                            className="leading-normal text-lg no-underline text-white bg-[#F2B705] px-4 py-2 rounded"
                        >
                            {currentUser ? 'Logout' : 'Login'}
                        </button>
                    </ul>
                </div>

                {dropdown && (
                    <div onClick={handleDropdownToggle} className="lg:hidden w-full h-full fixed top-24 bg-cover ease-in-out duration-100 bg-transparent">
                        <div className="w-full h-[320px] flex-col items-baseline pt-8 gap-4">
                            <ul className="text-center p-0 flex flex-col justify-center w-full gap-y-8 text-yellow-500">
                                <a href="/" className="leading-normal text-lg no-underline text-white">Home</a>
                                <a href="/constitution" className="leading-normal text-lg no-underline text-white">Constitution</a>
                                <a href="/about" className="leading-normal text-lg no-underline text-white">About Us</a>
                                <a href="/contact" className="leading-normal text-lg no-underline text-white">Contact Us</a>
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
        </nav>
    );
};

export default Navbar;
