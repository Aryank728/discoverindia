import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-use-history'
import IndiaMap from '@svg-maps/india';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';

const Map = () => {
    const [selectedState, setSelectedState] = useState(null);
    const mapContainerRef = useRef(null);
    const history = useHistory();

    const handleLocationClick = (event) => {
        const stateName = event.target.attributes.name?.value;
        if (stateName) {
            setSelectedState(stateName);
            history.push(`/state/${encodeURIComponent(stateName)}`);
        } else {
            console.error('State name is undefined or not found');
        }
    };

    const handleClickOutside = (event) => {
        if (mapContainerRef.current && !mapContainerRef.current.contains(event.target)) {
            setSelectedState(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div ref={mapContainerRef} className="mx-auto w-1/4 relative">
            <SVGMap
                map={IndiaMap}
                className="w-full h-auto india-map stroke-black stroke-1"
                onLocationClick={handleLocationClick}
            />
            {/* Removed the div for displaying selectedState */}
        </div>
    );
};

export default Map;
