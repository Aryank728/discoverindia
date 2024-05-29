import React from 'react';
import Lottie from 'react-lottie';
import { useEffect, useState } from 'react';

const LottieAnimation = ({ animationData }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    const getAnimationSize = () => {
        if (windowWidth < 640) {
            // Small screens (mobile)
            return { height: 300, width: 400 };
        } else if (windowWidth < 1024) {
            // Medium screens (tablets)
            return { height: 450, width: 600 };
        } else {
            // Large screens (desktops)
            return { height: 600, width: 800 };
        }
    };

    const { height, width } = getAnimationSize();

    return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LottieAnimation;
