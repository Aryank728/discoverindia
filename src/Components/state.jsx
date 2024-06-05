/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from 'react';
import { db, image } from "../firebase";
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";

const StateComponent = ({ collectionName }) => {
    const [data, setData] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            const fetchData = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, collectionName));
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
    }, [isLoading, collectionName]);

    return (
        <div>
            <Navbar />
            {data.length > 0 ? (
                data.map((item) => {
                    const stateImage = imageUrls[item.id]?.stateImage || "";

                    return (
                        <div key={item.id} className="mb-8">
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
                            {item.latitude && item.longitude && (
                                <div className="mt-4">
                                    <iframe
                                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${item.longitude}!3d${item.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${item.latitude},${item.longitude}!5e0!3m2!1sen!2sin!4v1716888936335!5m2!1sen!2sin`}
                                        width="600"
                                        height="450"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
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

export default StateComponent;
