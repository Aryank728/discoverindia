/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

function Slideshow({ slides }) {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            showNextSlide();
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [slideIndex]);



    const showNextSlide = () => {
        setSlideIndex((prevIndex) => {
            if (prevIndex === slides.length - 1) {
                return 0;
            } else {
                return prevIndex + 1;
            }
        });
    };

    return (
        <div className="slideshow-container">
            {slides.map((slide, index) => (
                <div key={index} className={index === slideIndex ? 'mySlides' : 'mySlides hidden'}>
                    <img src={slide} alt={`Slide ${index + 1}`} />
                </div>
            ))}
            <div className="dots">
                {slides.map((_, index) => (
                    <span key={index} className={index === slideIndex ? 'dot active' : 'dot'}></span>
                ))}
            </div>
        </div>
    );
}

export default Slideshow;
