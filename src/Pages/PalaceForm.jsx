import React, { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { app, image } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const indianStates = [
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka',
    'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const Firestore = getFirestore(app);
const auth = getAuth(app);

function PalaceForm() {
    const [state, setState] = useState('');
    const [placeName, setPlaceName] = useState('');
    const [placeImage, setPlaceImage] = useState(null);
    const [placeDescription, setPlaceDescription] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const uploadImage = async (imageFile, folder) => {
        const imageRef = ref(image, `${folder}/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile, {
            contentType: imageFile.type,
        });
        console.log(`${folder} image uploaded successfully`);
        return imageRef.fullPath;
    };

    const handlePlaceImageChange = (e) => {
        setPlaceImage(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsSubmitting(true);
            const currentUser = auth.currentUser;
            const userEmail = currentUser.email;
            const userName = currentUser.displayName;

            const placeImagePath = await uploadImage(placeImage, 'placeimage');

            const placeData = {
                state, // Include state in placeData
                placeName,
                placeDescription,
                placeImagePath,
                latitude,
                longitude
            };

            if (userEmail === 'kumararyan1929@gmail.com') {
                await addDoc(collection(Firestore, state.toLowerCase().replace(/\s+/g, '')), placeData);
                console.log('Document added successfully to state collection');
            } else {
                placeData.userName = userName;
                placeData.userEmail = userEmail;
                await addDoc(collection(Firestore, 'review'), placeData);
                console.log('Document added successfully to review collection');
            }

            clearForm();
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
        } catch (error) {
            console.error('Error adding document: ', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearForm = () => {
        setState('');
        setPlaceName('');
        setPlaceImage(null);
        setPlaceDescription('');
        setLatitude('');
        setLongitude('');
        document.getElementById('placeImage').value = ''; // <--- Reset file input
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h2 className="col-span-1 md:col-span-2 text-3xl font-bold text-center text-blue-600">Place Form</h2>
                    <div>
                        <label htmlFor="state" className="block text-sm font-semibold text-gray-700">State:</label>
                        <select
                            id="state"
                            onChange={(e) => setState(e.target.value)}
                            value={state}
                            required
                            className="mt-1 p-3 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select State</option>
                            {indianStates.map((stateName, index) => (
                                <option key={index} value={stateName}>{stateName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="placeName" className="block text-sm font-semibold text-gray-700">Place Name:</label>
                        <input
                            id="placeName"
                            onChange={(e) => setPlaceName(e.target.value)}
                            value={placeName}
                            required
                            className="mt-1 p-3 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="placeImage" className="block text-sm font-semibold text-gray-700">Place Image:</label>
                        <input
                            id="placeImage"
                            onChange={handlePlaceImageChange}
                            type="file"
                            accept="image/*"
                            required
                            className="mt-1 p-3 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="latitude" className="block text-sm font-semibold text-gray-700">Latitude:</label>
                        <input
                            id="latitude"
                            onChange={(e) => setLatitude(e.target.value)}
                            value={latitude}
                            required
                            type="text"
                            className="mt-1 p-3 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="longitude" className="block text-sm font-semibold text-gray-700">Longitude:</label>
                        <input
                            id="longitude"
                            onChange={(e) => setLongitude(e.target.value)}
                            value={longitude}
                            required
                            type="text"
                            className="mt-1 p-3 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="placeDescription" className="block text-sm font-semibold text-gray-700">Place Description:</label>
                        <textarea
                            id="placeDescription"
                            onChange={(e) => setPlaceDescription(e.target.value)}
                            value={placeDescription}
                            rows="4"
                            required
                            placeholder="Enter Place Description"
                            className="mt-1 p-3 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`col-span-1 md:col-span-2 w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-opacity ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 w-full py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Back
                </button>
                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-2xl font-semibold text-blue-600">Place Added Successfully!</h3>
                            <p className="mt-4 text-gray-700">The place has been added to the database.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PalaceForm;

