import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-use-history';
import IndiaMap from '@svg-maps/india';
import { SVGMap } from 'react-svg-map';
import "./indiaMap.css";

const stateColors = {
    AndhraPradesh: "#FF6347",
    ArunachalPradesh: "#4682B4",
    Assam: "#32CD32",
    Bihar: "#FFD700",
    Chhattisgarh: "#FF69B4",
    Delhi: "#8A2BE2",
    Goa: "#8A2BE2",
    Gujarat: "#FF4500",
    Haryana: "#2E8B57",
    HimachalPradesh: "#DA70D6",
    Jharkhand: "#1E90FF",
    Karnataka: "#FF1493",
    Kerala: "#00FF7F",
    MadhyaPradesh: "#8B0000",
    Maharashtra: "#808000",
    Manipur: "#00CED1",
    Meghalaya: "#FF00FF",
    Mizoram: "#8A2BE2",
    Nagaland: "#FF8C00",
    Odisha: "#B8860B",
    Punjab: "#32CD32",
    Rajasthan: "#8B4513",
    Sikkim: "#A52A2A",
    TamilNadu: "#7FFF00",
    Telangana: "#D2691E",
    Tripura: "#6495ED",
    UttarPradesh: "#DC143C",
    Uttarakhand: "#008B8B",
    WestBengal: "#B22222",
    JammuKashmir: "#6A5ACD" // Adding color for Jammu and Kashmir
};

const Map = () => {
    const [selectedState, setSelectedState] = useState(null);
    const mapContainerRef = useRef(null);
    const history = useHistory();

    const handleLocationClick = (event) => {
        const stateName = event.target.attributes.name?.value.replace(/\s+/g, '');
        if (stateName) {
            setSelectedState(stateName);
            const formattedStateName = stateName.toLowerCase();
            history.push(`/state/${encodeURIComponent(formattedStateName)}`);
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
        <div ref={mapContainerRef} className="relative">
            <SVGMap
                map={IndiaMap}
                className="w-full h-auto stroke-black stroke-1"
                onLocationClick={handleLocationClick}
                locationClassName={(location) => {
                    const stateName = location.name.replace(/\s+/g, '');
                    return `svg-map__location ${stateName}`;
                }}
            />
        </div>
    );
};

export default Map;
