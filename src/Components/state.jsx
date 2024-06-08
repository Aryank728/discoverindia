/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from 'react';
import { db, image } from "../firebase";
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import { Circles } from 'react-loader-spinner';

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
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Circles
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            ) : (
                data.map((item) => {
                    const stateImage = imageUrls[item.id]?.stateImage || "";

                    return (
                        <div key={item.id} className="mb-8">
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
                            {item.iframeCode && ( // Ensuring iframeCode exists before rendering iframe
                                <div className="mt-4">
                                    <iframe
                                        srcDoc={item.iframeCode} // Use srcDoc instead of src
                                        width="550"
                                        height="450"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-ref errer-when-downgrade"
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
            )}
            <Footer />
        </div>
    );
}

export default StateComponent;
