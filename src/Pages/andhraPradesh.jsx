import React, { useState, useEffect } from 'react';
import { db, image } from "../firebase";
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";

const AndhraPradesh = () => {
    const [data, setData] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            const fetchData = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, "andhrapradesh"));
                    const fetchedData = [];
                    const imagePromises = [];

                    querySnapshot.forEach((doc) => {
                        const docData = doc.data();

                        const convertedData = {
                            ...docData,
                            formationDate: docData.formationDate ? docData.formationDate.toDate().toDateString() : '',
                            timestamp: docData.timestamp ? docData.timestamp.toDate() : new Date(0) // Fallback to epoch if timestamp is missing
                        };

                        fetchedData.push({ id: doc.id, ...convertedData });

                        if (docData.placeImagePath) {
                            imagePromises.push(
                                getDownloadURL(storageRef(image, docData.placeImagePath)).then((url) => ({
                                    id: doc.id,
                                    type: 'placeImage',
                                    url
                                }))
                            );
                        }

                        if (docData.stateImagePath) {
                            imagePromises.push(
                                getDownloadURL(storageRef(image, docData.stateImagePath)).then((url) => ({
                                    id: doc.id,
                                    type: 'stateImage',
                                    url
                                }))
                            );
                        }
                    });

                    const images = await Promise.all(imagePromises);
                    const imageUrls = images.reduce((acc, { id, type, url }) => {
                        if (!acc[id]) acc[id] = {};
                        acc[id][type] = url;
                        return acc;
                    }, {});

                    // Sort the data by timestamp in descending order
                    fetchedData.sort((a, b) => b.timestamp - a.timestamp);

                    setData(fetchedData);
                    setImageUrls(imageUrls);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching documents: ", error);
                }
            };

            fetchData();
        }
    }, [isLoading]);

    return (
        <div>
            <Navbar />
            {data.length > 0 ? (
                data.map((item) => {
                    const stateImage = imageUrls[item.id]?.stateImage || "";

                    return (
                        <div key={item.id}>
                            {/* Check if population field is present */}
                            {item.hasOwnProperty('population') && (
                                <Sidebar
                                    imageSrc={stateImage}
                                    formationDate={item.formationDate}
                                    capital={item.capital}
                                    governor={item.governor}
                                    population={item.population}
                                    chiefMinister={item.chiefMinister}
                                />
                            )}
                            {imageUrls[item.id]?.placeImage && (
                                <div>
                                    <img src={imageUrls[item.id].placeImage} alt="Place" />
                                </div>
                            )}
                            <div>
                                <p className='font-bold'>{item.placeName}</p>
                                <p>{item.placeDescription}</p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>Loading...</p>
            )}
            <Footer />
        </div>
    );
}

export default AndhraPradesh;
