import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import logo from "../asset/DOC-20240518-WA0004.png";

const Sidebar = (props) => {
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        // console.log("Sidebar Props:", props);
    }, [props]);

    return (
        <>
            <div className={`fixed top-0 right-0 h-full bg-gray-800 bg-opacity-70 text-white p-4 transition-transform duration-300 transform ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}>
                <a href="/" className="font-popoppins text-3xl font-bold text-[#ce8a5c]">
                    <img src={logo} alt="Tour India Logo" className="h-[40%] mx-auto lg:mx-0 mx-center" />
                </a>
                <div className="flex flex-col items-center">
                    {props.imageSrc && (
                        <div className="w-42 h-40 overflow-hidden mb-4">
                            <img src={props.imageSrc} alt="Region" className="object-cover w-full h-full" />
                        </div>
                    )}
                    <div className="text-left mt-[5%]">
                        <h2 className="text-xl font-semibold mb-2 text-white">Region Information</h2>
                        {props.formationDate && <p className="text-white">Formation: {props.formationDate}</p>}
                        <p className="text-white">Capital: {props.capital}</p>
                        <p className="text-white">Governor: {props.governor}</p>
                        <p className="text-white">Population: {props.population}</p>
                        <p className="text-white">Chief Minister: {props.chiefMinister}</p>
                    </div>
                </div>
            </div>
            <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="fixed top-1/2 transform -translate-y-1/2 right-0 bg-gray-800 text-white p-2 rounded-l focus:outline-none z-50"
            >
                {showSidebar ? <FaArrowLeft /> : <FaArrowRight />}
            </button>
        </>
    );
};

export default Sidebar;
