import React, { useRef } from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Map from "../Components/indiaMap";
// import BIRDS from 'vanta/dist/vanta.birds.min';
// import VanillaTilt from 'vanilla-tilt';
import './sample.css';

export default function Sample() {
    // const [vantaEffect, setVantaEffect] = useState(null);
    const tiltRef = useRef(null);
    const vantaRef = useRef(null);

    // useEffect(() => {
    //     try {
    //         if (!vantaEffect) {
    //             setVantaEffect(
    //                 BIRDS({
    //                     el: vantaRef.current,
    //                     color1: 0x1e90ff,
    //                     color2: 0xff6347,
    //                     backgroundAlpha: 0.0,
    //                     waveHeight: 20,
    //                     shininess: 50,
    //                     waveSpeed: 1.5,
    //                     zoom: 0.75,
    //                 })
    //             );
    //         }
    //         VanillaTilt.init(tiltRef.current, {
    //             max: 25,
    //             speed: 400,
    //             glare: true,
    //             "max-glare": 0.5,
    //         });
    //     } catch (error) {
    //         console.error('Initialization error:', error);
    //     }
    //     return () => {
    //         if (vantaEffect) vantaEffect.destroy();
    //     };
    // }, [vantaEffect]);

    return (
        <>
            <div className="min-h-screen flex flex-col bg-gradient-animated bg-[length:400%_400%] animate-gradient-animate relative overflow-hidden">
                <div ref={vantaRef} className="absolute inset-0 z-0"></div>
                <Navbar />
                <div className="flex flex-col lg:flex-row justify-between items-start mt-2 lg:mr-4">
                    <div className="mt-4 lg:float-left lg:w-1/2 lg:mr-[200px]">
                        <h2 className="font-poppins text-6xl text-[#d93b3b] font-bold mb-4 mt-[210px]">TOUR INDIA</h2>
                        <p className="font-roboto text-4xl text-[#F2B705] ml-10">
                            Delve into the vibrant tapestry of India's states and territories. Our comprehensive maps and insightful information will guide you through the rich cultural and administrative landscapes of this incredible nation. Perfect for explorers, students, and curious minds alike.
                        </p>
                    </div>
                    <div className="hidden lg:block lg:w-[800px] relative p-4">
                        <div className="w-full h-[600px]">
                            <Map />
                        </div>
                    </div>
                    <div className="block lg:hidden w-full relative p-4">
                        <div className="w-full h-[400px]">
                            <Map />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
