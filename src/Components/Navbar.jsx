import React, { useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);

    const showDropdown = () => {
        setDropdown(!dropdown);
    };

    return (
        <nav className="w-full h-24 flex flex-col justify-center items-center bg-transparent sticky top-0 z-20">
            <div className="container mx-auto lg:px-6">
                <div className="lg:w-full w-11/12 mx-auto h-full flex justify-between items-center">
                    <div className="flex flex-col gap-y-4 lg:w-1/3">
                        <span className="flex items-center gap-x-2 font-bold text-2xl">
                            <a href="/" className="font-popoppins text-3xl font-bold text-[#ce8a5c]">राज्य</a>
                        </span>
                    </div>
                    <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden text-yellow-500">
                        <a href="/" className="leading-normal text-lg no-underline text-white">Home</a>
                        <a href="/about" className="leading-normal text-lg no-underline text-white">Contact Us</a>
                        <a href="/chhota4dham" className="leading-normal text-lg no-underline text-white">Chhota 4Dham</a>
                        <a href="/bada4dham" className="leading-normal text-lg no-underline text-white">Bada 4Dham</a>
                    </ul>
                    <div onClick={showDropdown} className="lg:button text-[22px] cursor-pointer text-black">
                        {dropdown ? <MdClose /> : <HiMenuAlt3 />}
                    </div>
                </div>

                {dropdown && (
                    <div onClick={showDropdown} className="lg:hidden w-full h-full fixed top-24 bg-cover ease-in-out duration-100 bg-transparent">
                        <div className="w-full h-[320px] flex-col items-baseline pt-8 gap-4">
                            <ul className="text-center p-0 flex flex-col justify-center w-full gap-y-8 text-yellow-500">
                                <a href="/" className="leading-normal text-lg no-underline text-white">Home</a>
                                <a href="/about" className="leading-normal text-lg no-underline text-white">Contact Us</a>
                                <a href="/chhota4dham" className="leading-normal text-lg no-underline text-white">Chhota 4Dham</a>
                                <a href="/bada4dham" className="leading-normal text-lg no-underline text-white">Bada 4Dham</a>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
