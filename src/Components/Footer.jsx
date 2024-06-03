import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Footer = () => {
    const quotes = [
        { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "Get busy living or get busy dying.", author: "Stephen King" },
        { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
        { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" }
    ];

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false  // Disable the arrows
    };

    return (
        <footer className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-8 px-3'>
            <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
                <div className='flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left'>
                    <p className='text-white font-poppins font-bold'>
                        Discover India <br />
                        <span>All rights reserved &copy; 2024</span>
                    </p>
                </div>
                <div className='w-full lg:w-1/3 mt-8 lg:mt-0 mx-auto lg:mx-0'>
                    <Slider {...settings}>
                        {quotes.map((quote, index) => (
                            <div key={index} className="quote-slide p-4">
                                <blockquote className="text-center">
                                    <p className="text-lg italic text-white">"{quote.text}"</p>
                                    <footer className="mt-1 text-pink-200">- {quote.author}</footer>
                                </blockquote>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className='flex flex-col lg:flex-row gap-x-8 gap-y-4 list-none mt-4 lg:mt-0 lg:ml-8'>
                    <a href='https://github.com/Aryank728' className='text-white'>Github</a>
                    <a href='https://www.linkedin.com/in/Aryank728' className='text-white'>LinkedIn</a>
                    <a href='https://aryankr.netlify.app' className='text-white'>Portfolio</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
