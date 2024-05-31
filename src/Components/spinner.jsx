// Spinner.js
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = ({ loading }) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <ClipLoader color={"#3498db"} loading={loading} size={150} />
        </div>
    );
}

export default Spinner;
