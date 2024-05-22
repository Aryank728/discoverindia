import React, { useRef, useState, useEffect } from 'react';
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import Map from "../Components/indiaMap";
import BIRDS from 'vanta/dist/vanta.birds.min';
import VanillaTilt from 'vanilla-tilt';
import './sample.css';

export default function Sample() {
    const [vantaEffect, setVantaEffect] = useState(null);
    const tiltRef = useRef(null);
    const vantaRef = useRef(null);

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
            // Initialize tilt effect on the map container
            VanillaTilt.init(tiltRef.current, {
                max: 25,
                speed: 400,
                glare: true,
                "max-glare": 0.5,
            });
        } catch (error) {
            console.error('Initialization error:', error);
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <>
            <div className="min-h-screen flex flex-col bg-gradient-animated bg-[length:400%_400%] animate-gradient-animate relative overflow-hidden">
                <div ref={vantaRef} className="absolute inset-0 z-0"></div>
                <Navbar />
                <div className="flex flex-1 justify-end items-start mt-2 mr-4">
                    <Sidebar />
                    <div className="w-full max-w-[800px] relative ">
                        <div className="tilt-div w-full h-[600px]">
                            <Map />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
