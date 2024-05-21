import React, { useEffect, useRef, useState } from 'react';
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import Map from "../Components/indiaMap";
import BIRDS from 'vanta/dist/vanta.birds.min';

export default function Sample() {
    const [vantaEffect, setVantaEffect] = useState(null);
    const vantaRef = useRef(null);

    useEffect(() => {
        try {
            if (!vantaEffect) {
                setVantaEffect(
                    BIRDS({
                        el: vantaRef.current,
                        color: 0x000000,
                        waveHeight: 20,
                        shininess: 50,
                        waveSpeed: 1.5,
                        zoom: 0.75,
                    })
                );
            }
        } catch (error) {
            console.error('Vanta effect initialization error:', error);
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div className="min-h-screen bg-gradient-animated bg-[length:400%_400%] animate-gradient-animate relative">
            <div ref={vantaRef} className="absolute inset-0 z-0"></div>
            <div className="relative z-10">
                <Navbar />
                <Sidebar />
                <div className="flex justify-end items-right min-h-screen">
                    <Map />
                </div>
                <Footer />
            </div>
        </div>
    );
}
