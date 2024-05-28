import React, { useState, useEffect } from 'react';
import { db, image } from "../firebase";
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (isLoading) {
            const fetchData = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, "review"));
                    const fetchedData = [];
                    const imagePromises = [];

                    querySnapshot.forEach((doc) => {
                        const docData = doc.data();

                        const convertedData = {
                            ...docData,
                            formationDate: docData.formationDate ? docData.formationDate.toDate().toDateString() : '',
                            timestamp: docData.timestamp ? docData.timestamp.toDate() : new Date(0), // Fallback to epoch if timestamp is missing
                            state: docData.state // Make sure state is included
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

    const handleAccept = async (id, state) => {
        try {
            const docRef = doc(db, "review", id);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const docData = docSnapshot.data();
                const targetCollection = collection(db, state.toLowerCase().replace(/\s+/g, ''));

                await addDoc(targetCollection, docData);
                await deleteDoc(docRef);
                setFeedback('Document accepted successfully');
            } else {
                setFeedback(`Document with id ${id} does not exist`);
            }
        } catch (error) {
            console.error("Error accepting document: ", error);
            setFeedback('Error accepting document');
        } finally {
            setIsLoading(true); // Trigger re-fetching data after update
        }
    };

    const handleReject = async (id) => {
        try {
            const docRef = doc(db, "review", id);
            await deleteDoc(docRef);
            setFeedback('Document rejected and deleted successfully');
        } catch (error) {
            console.error("Error rejecting document: ", error);
            setFeedback('Error rejecting document');
        } finally {
            setIsLoading(true); // Trigger re-fetching data after update
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-8">
                <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
                {feedback && <div className="alert">{feedback}</div>}
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border">Username</th>
                                    <th className="py-2 px-4 border">State</th>
                                    <th className="py-2 px-4 border">Place Details</th>
                                    <th className="py-2 px-4 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td className="py-2 px-4 border">{item.userName}</td>
                                        <td className="py-2 px-4 border">{item.state}</td> {/* Display state */}
                                        <td className="py-2 px-4 border">
                                            <p className='font-bold'>{item.placeName}</p>
                                            <p>{item.placeDescription}</p>
                                        </td>
                                        <td className="py-2 px-4 border">
                                            <button
                                                onClick={() => window.open(imageUrls[item.id]?.placeImage || '', '_blank')}
                                                className="bg-blue-500 text-white py-1 px-3 rounded m-1"
                                            >
                                                View Image
                                            </button>
                                            <button
                                                onClick={() => window.open(`https://www.google.com/maps?q=${item.latitude},${item.longitude}`, '_blank')}
                                                className="bg-blue-500 text-white py-1 px-3 rounded m-1"
                                            >
                                                View Map
                                            </button>
                                            <button
                                                onClick={() => handleAccept(item.id, item.state)}
                                                className="bg-green-500 text-white py-1 px-3 rounded m-1"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleReject(item.id)}
                                                className="bg-red-500 text-white py-1 px-3 rounded m-1"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;


