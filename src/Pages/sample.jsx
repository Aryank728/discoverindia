import React, { useRef, useEffect, useState } from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Map from "../Components/indiaMap";
import SlideShow from "../Components/Slides";
import BIRDS from 'vanta/dist/vanta.birds.min';
import VanillaTilt from 'vanilla-tilt';
import './sample.css';

export default function Sample() {
    const [vantaEffect, setVantaEffect] = useState(null);
    const tiltRef = useRef(null);
    const vantaRef = useRef(null);

    const slides = [
        require('../asset/home/landscape.jpg'),
        require('../asset/home/boats.jpg'),
        require('../asset/home/mountain.jpg'),
        require('../asset/home/peafowl.jpg'),
        require('../asset/home/woman.jpg'),
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
            <p className='font-arial text-lg p-6 my-4'>
                India, one of the oldest civilizations globally, offers a rich tapestry of diverse experiences. It's like a vibrant mosaic, blending various cultures seamlessly. Spanning across 32,87,263 sq. km, from the majestic Himalayas to the lush greenery of the south, India stands out as the 7th largest country globally.

                Imagine being embraced by the towering Himalayas in the north, gradually transitioning towards the Indian Ocean, flanked by the Bay of Bengal and the Arabian Sea. <br />
                As you journey through India, you'll encounter a delightful blend of cuisines, beliefs, arts, and landscapes.

                From bustling markets to modern malls, and ancient monuments to lavish hotels, India effortlessly blends tradition with modernity. Whether you seek serene mountains, sandy beaches, or desert adventures, India offers something for everyone to explore and cherish.
            </p>
            <div className='w-[70%] h-[1%] position-relative m-auto mb-6'>
                <SlideShow slides={slides} />
            </div>
            <h3 className="font-poppins text-3xl font-bold mb-4 ml-6 text-left">States & Capitals of India:</h3>
            <p className='font-arial text-lg ml-6 mb-4'>India is the 7th largest country in the world and the 2nd most populous country in the world. With a total of 28 states and 8 Union Territories, it forms a union of states in India. Each state of India has an administrative, legislative and judicial capital some state all three functions are conducted in one capital. Every state is ruled by a Chief Minister. India is a union of states and in the states, the Governor, as the representative of the President, is the head of Executive. The system of state government closely resembles that of the Union.</p>
            <h3 className="font-poppins text-3xl font-bold mb-4 ml-6 text-left">What is State?</h3>
            <p className='font-arial text-lg ml-6 mb-4'>Each state of India has an administrative, legislative and judicial capital some states all three functions are conducted in one capital. It is a territory that has its own Chief Minister. A state has its own separate government. Functions of the state are handled by the State Government such as security, healthcare, governance, revenue generation, etc.
            </p>
            <h3 className="font-poppins text-3xl font-bold mb-4 ml-6 text-left">What is Union Territory</h3>
            <p className='font-arial text-lg ml-6 mb-4'>A Union Territory is an administrative division that is directly controlled by the Central Government. Union Territories are ruled directly by the Central Government and have a Lieutenant Governor as an administrator, who is the representative of the President of India and appointed by the Central government.
            </p>
            <Footer />
        </>
    );
}
