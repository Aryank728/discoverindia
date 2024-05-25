import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import logo from "../asset/DOC-20240518-WA0004.png"

const Sidebar = ({
    imageSrc,
    formation,
    capital,
    governor,
    population,
    chiefMinister,
    additionalFields
}) => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="fixed top-1/2 transform -translate-y-1/2 right-0 bg-gray-800 text-white p-2 rounded-l focus:outline-none z-50"
            >
                {showSidebar ? <FaArrowLeft /> : <FaArrowRight />}
            </button>

            <div className={`fixed top-0 right-0 h-full bg-gray-800 bg-opacity-70 text-white p-4 transition-transform duration-300 transform ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}>
                <a href="/" className="font-popoppins text-3xl font-bold text-[#ce8a5c]">
                    <img src={logo} alt="Tour India Logo" className="h-[40%] mx-auto lg:mx-0 mx-center" />
                </a>
                <div className="flex flex-col items-center">
                    {imageSrc && <img src={imageSrc} alt="Region" className="w-32 h-32 rounded-full mb-4" />}
                    <div className="text-left mt-[5%]">
                        <h2 className="text-xl font-semibold mb-2 text-black">Region Information</h2>
                        {formation && <p><strong>Formation:</strong> {formation}</p>}
                        {capital && <p><strong>Capital:</strong> {capital}</p>}
                        {governor && <p><strong>Governor:</strong> {governor}</p>}
                        {population && <p><strong>Population:</strong> {population}</p>}
                        {chiefMinister && <p><strong>Chief Minister:</strong> {chiefMinister}</p>}
                        {additionalFields && additionalFields.map((field, index) => (
                            <p key={index}><strong>{field.label}:</strong> {field.value}</p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
