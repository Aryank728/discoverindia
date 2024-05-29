import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaGithub, FaLinkedin, FaLink } from 'react-icons/fa';
import LottieAnimation from '../Components/animation';
import contactAnimation from '../asset/animation/Animation - aboutus.json';
import aryan from "../asset/aryan.jpg";
import brajesh from "../asset/brajesh.png";

const AboutUs = () => {
    const contributors = [
        {
            name: 'Aryan Kumar',
            role: 'Full Stack Developer & Project Visionary',
            description: 'Aryan is our full stack developer and project visionary. His expertise in both frontend and backend technologies allows us to build robust and scalable applications. Aryan\'s leadership and strategic vision guide our project to success.',
            imageUrl: aryan,
            github: 'https://github.com/Aryank728/',
            linkedin: 'https://www.linkedin.com/in/aryank728/',
            portfolio: 'https://aryankr.netlify.app'
        },
        {
            name: 'Brajesh Kumar Jha',
            role: 'Frontend Developer',
            description: 'Brajesh is our frontend wizard. His keen eye for design and proficiency in various web technologies allow us to create intuitive and engaging user interfaces. Brajesh\'s attention to detail and creativity ensure that our users have the best possible experience.',
            imageUrl: brajesh,
            github: 'https://github.com/brajeshkrjha/',
            linkedin: 'https://www.linkedin.com/in/brajeshkrjha/',
            portfolio: 'https://brajesh.netlify.app/'
        },
        {
            name: 'Israt Parveen',
            role: 'Designer',
            description: 'Israt designs our website and logo using Figma and Canva. Her creative vision and expertise in design tools help us create visually appealing and user-friendly designs. Israt\'s dedication to aesthetics ensures that our project looks professional and inviting.',
            imageUrl: 'https://via.placeholder.com/150',
            github: 'https://github.com/isratparveen',
            linkedin: 'https://www.linkedin.com/in/israt-parveen/',
            portfolio: 'https://israt.com'
        }
    ];

    return (
        <>
            <Navbar />
            <section className="bg-white-100 py-12">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-semibold text-center mb-8">About Us</h2>
                    <div className="text-center mb-8">
                        <p className="text-xl mb-4">
                            Welcome to our project! We are a dedicated team of developers passionate about creating innovative and user-friendly solutions. Our diverse backgrounds and skills come together to build something truly special. Meet the team:
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <LottieAnimation animationData={contactAnimation} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contributors.map((contributor, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <img src={contributor.imageUrl} alt={contributor.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold mb-2">{contributor.name}</h3>
                                <p className="text-gray-700 mb-4">{contributor.role}</p>
                                <p className="text-gray-700 mb-4">{contributor.description}</p>
                                <div className="flex justify-center space-x-4">
                                    <a href={contributor.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition duration-300">
                                        <FaGithub size={30} />
                                    </a>
                                    <a href={contributor.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition duration-300">
                                        <FaLinkedin size={30} />
                                    </a>
                                    <a href={contributor.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition duration-300">
                                        <FaLink size={30} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AboutUs;
