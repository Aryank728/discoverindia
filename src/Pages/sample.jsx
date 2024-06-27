import React, { useRef, /*useEffect, useState*/ } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Map from "../Components/indiaMap";
import SlideShow from "../Components/Slides";
import Mandala from "../asset/mandala logo.png";
import BIRDS from "vanta/dist/vanta.birds.min";
import VanillaTilt from "vanilla-tilt";
import map from "../asset/map.jpg";
import "./sample.css";

// Importing text content from TextContent.js
import {
    tourIndiaText,
    indiaDetailsText,
    statesAndCapitalsText,
    stateDefinitionText,
    unionTerritoryDefinitionText,
} from "../Pages/textContent";

export default function Sample() {
    const [vantaEffect, setVantaEffect] = useState(null);
    const tiltRef = useRef(null);
    const vantaRef = useRef(null);

    const slides = [
        require("../asset/home/landscape.jpg"),
        require("../asset/home/boats.jpg"),
        require("../asset/home/mountain.jpg"),
        require("../asset/home/peafowl.jpg"),
        require("../asset/home/woman.jpg"),
        // Add more image paths as needed
    ];

    useEffect(() => {
        try {
            if (!vantaEffect) {
                setVantaEffect(
                    BIRDS({
                        el: vantaRef.current,
                        color1: 0x1e90ff,
                        color2: 0xff6347,
                        backgroundAlpha: 0.0,
                        waveHeight: 20,
                        shininess: 50,
                        waveSpeed: 1.5,
                        zoom: 0.75,
                    })
                );
            }
            VanillaTilt.init(tiltRef.current, {
                max: 25,
                speed: 400,
                glare: true,
                "max-glare": 0.5,
            });
        } catch (error) {
            console.error("Initialization error:", error);
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <>
            <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-animate relative overflow-hidden font-sans">
                <div ref={vantaRef} className="absolute inset-0 z-0"></div>
                <Navbar />
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start mt-10 px-6 lg:px-12 relative">
                    <img
                        src={Mandala}
                        alt="Mandala Art"
                        className="mandala-art absolute z-0 w-1/2 opacity-10"
                    />

                    <div className="text-container p-4 lg:w-1/2 relative z-10  rounded-lg">
                        <h2 className="font-poppins text-4xl lg:text-6xl text-green-950 font-bold mb-6 mt-10 lg:mt-20 leading-tight">
                            DISCOVER <span style={{ color: "maroon" }}>INDIA</span>
                        </h2>
                        <p className="font-roboto text-xl lg:text-2xl text-darkgrey-300 mb-6 leading-relaxed">
                            {tourIndiaText}
                        </p>
                    </div>

                    <div className="hidden lg:block lg:w-1/2 relative p-4">
                        <div className="w-full h-80 lg:h-96">
                            <Map />
                        </div>
                    </div>
                    <div className="block lg:hidden w-full relative p-4">
                        <div className="w-full h-80 lg:h-96">
                            <Map />
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-6 lg:px-12 py-10 bg-gray-100 text-gray-800">
                <p className="font-arial text-lg mb-6 leading-relaxed">
                    {indiaDetailsText}
                </p>
                <div className="w-full lg:w-2/3 mx-auto mb-10">
                    <SlideShow slides={slides} />
                </div>
                <h3 className="font-poppins text-3xl font-bold mb-6">
                    States & Capitals of India:
                </h3>
                <p className="font-arial text-lg mb-6 leading-relaxed">
                    {statesAndCapitalsText}
                </p>
                <h3 className="font-poppins text-3xl font-bold mb-6">What is State?</h3>
                <p className="font-arial text-lg mb-6 leading-relaxed">
                    {stateDefinitionText}
                </p>
                <h3 className="font-poppins text-3xl font-bold mb-6">
                    What is Union Territory
                </h3>
                <p className="font-arial text-lg mb-6 leading-relaxed">
                    {unionTerritoryDefinitionText}
                </p>
                <img
                    src={map}
                    alt="India Map"
                    className="w-full lg:w-2/3 mx-auto mb-10"
                />
            </div>
            <Footer />
        </>
    );
}
