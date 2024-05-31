import React, { useState, useEffect } from 'react';
import { db, image } from "../firebase";
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Spinner from "../Components/spinner"; // Import the Spinner component

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
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

        if (isLoading) {
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
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <header className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24">
                <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/path/to/your/hero-image.jpg')" }}></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl font-bold mb-6">Dashboard</h1>
                    <p className="text-2xl">Manage and review submitted data</p>
                </div>
            </header>
            <main className="flex-grow container mx-auto py-10 px-4">
                {feedback && <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4 shadow">{feedback}</div>}
                {isLoading ? (
                    <Spinner loading={isLoading} /> // Use the Spinner component when loading
                ) : (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="py-3 px-4 border">Username</th>
                                    <th className="py-3 px-4 border">State</th>
                                    <th className="py-3 px-4 border">Place Details</th>
                                    <th className="py-3 px-4 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                        <td className="py-3 px-4 border">{item.userName}</td>
                                        <td className="py-3 px-4 border">{item.state}</td>
                                        <td className="py-3 px-4 border">
                                            <p className='font-bold'>{item.placeName}</p>
                                            <p>{item.placeDescription}</p>
                                        </td>
                                        <td className="py-3 px-4 border flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                                            <button
                                                onClick={() => window.open(imageUrls[item.id]?.placeImage || '', '_blank')}
                                                className="bg-blue-500 text-white py-1 px-3 rounded shadow hover:bg-blue-600"
                                            >
                                                View Image
                                            </button>
                                            <button
                                                onClick={() => window.open(`https://www.google.com/maps?q=${item.latitude},${item.longitude}`, '_blank')}
                                                className="bg-blue-500 text-white py-1 px-3 rounded shadow hover:bg-blue-600"
                                            >
                                                View Map
                                            </button>
                                            <button
                                                onClick={() => handleAccept(item.id, item.state)}
                                                className="bg-green-500 text-white py-1 px-3 rounded shadow hover:bg-green-600"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleReject(item.id)}
                                                className="bg-red-500 text-white py-1 px-3 rounded shadow hover:bg-red-600"
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
            </main>
            <Footer />
        </div>
    );
}

export default Dashboard;
