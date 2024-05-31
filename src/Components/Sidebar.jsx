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
            <div className={`fixed top-0 right-0 h-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-6 transition-transform duration-300 transform ${showSidebar ? 'translate-x-0' : 'translate-x-full'} shadow-lg`}>
                <div className="flex flex-col items-center">
                    <a href="/" className="mb-6">
                        <img src={logo} alt="Tour India Logo" className="h-24 mx-auto" />
                    </a>
                    {props.imageSrc && (
                        <div className="w-64 h-64 overflow-hidden mb-4 rounded-lg shadow-md">
                            <img src={props.imageSrc} alt="Region" className="object-cover w-full h-full" />
                        </div>
                    )}
                    <div className="text-left mt-6 w-full px-4">
                        <h2 className="text-xl font-semibold mb-4 text-white border-b-2 border-[#ce8a5c] pb-2">Region Information</h2>
                        {props.formationDate && <p className="text-gray-300 mb-2"><span className="font-bold">Formation:</span> {props.formationDate}</p>}
                        <p className="text-gray-300 mb-2"><span className="font-bold">Capital:</span> {props.capital}</p>
                        <p className="text-gray-300 mb-2"><span className="font-bold">Governor:</span> {props.governor}</p>
                        <p className="text-gray-300 mb-2"><span className="font-bold">Population:</span> {props.population}</p>
                        <p className="text-gray-300 mb-2"><span className="font-bold">Chief Minister:</span> {props.chiefMinister}</p>
                    </div>
                </div>
            </div>
            <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="fixed top-1/2 transform -translate-y-1/2 right-0 bg-gray-800 text-white p-2 rounded-l focus:outline-none z-50 hover:bg-gray-700 transition-colors duration-300 shadow-md"
            >
                {showSidebar ? <FaArrowLeft /> : <FaArrowRight />}
            </button>
        </>
    );
};

export default Sidebar;
