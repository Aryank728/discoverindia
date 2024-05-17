import React from 'react';
import IndiaMap from "../Components/indiaMap";

const Sample = () => {
    return (
        <div>
            <IndiaMap onClick={(region) => {
                console.log(region.name);
            }}>
            </IndiaMap>
            <h1>Hello</h1>
        </div>
    )
}

export default Sample;
