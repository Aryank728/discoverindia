import React, { useState, useEffect } from 'react';
import { db, image } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';

const FetchData = () => {
    const [data, setData] = useState(null);
    const [placeImageUrl, setPlaceImageUrl] = useState('');
    const [stateImageUrl, setStateImageUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "states", "EbrF5aGP6bbXbyj8jy1x");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const fetchedData = docSnap.data();
                    setData(fetchedData);

                    // Fetch place image URL
                    const placeImageRef = storageRef(image, fetchedData.placeImagePath);
                    const placeImageUrl = await getDownloadURL(placeImageRef);
                    setPlaceImageUrl(placeImageUrl);

                    // Fetch state image URL
                    const stateImageRef = storageRef(image, fetchedData.stateImagePath);
                    const stateImageUrl = await getDownloadURL(stateImageRef);
                    setStateImageUrl(stateImageUrl);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this useEffect runs once on component mount

    return (
        <div>
            <h1>Fetching Data</h1>
            {data ? (
                <div>
                    <h2>Fetched Data:</h2>
                    <p><strong>State:</strong> {data.state}</p>
                    <p><strong>Population:</strong> {data.population}</p>
                    <p><strong>Famous Place:</strong> {data.famousPlace}</p>
                    {placeImageUrl && (
                        <div>
                            <h3>Place Image:</h3>
                            <img src={placeImageUrl} alt="Place" />
                        </div>
                    )}
                    {stateImageUrl && (
                        <div>
                            <h3>State Image:</h3>
                            <img src={stateImageUrl} alt="State" />
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default FetchData;
