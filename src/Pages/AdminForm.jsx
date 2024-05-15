import React, { useEffect, useState } from 'react';
import { collection, addDoc, Timestamp, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

const indianStates = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
];

const Firestore = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);

function AdminForm() {
    const [state, setState] = useState('');
    const [capital, setCapital] = useState('');
    const [stateImage, setStateImage] = useState(null);
    const [stateDescription, setStateDescription] = useState('');
    const [famousPlace, setFamousPlace] = useState('');
    const [placeImage, setPlaceImage] = useState(null);
    const [placeDescription, setPlaceDescription] = useState('');
    const [formationDate, setFormationDate] = useState('');
    const [governor, setGovernor] = useState('');
    const [population, setPopulation] = useState('');
    const [chiefMinister, setChiefMinister] = useState('');
    const [showModal, setShowModal] = useState(false); // Modal state
    const navigate = useNavigate();

    const uploadFile = (file) => {
        const imageRef = ref(storageRef, `images/${file.name}`);
        return uploadBytes(imageRef, file);
    };

    useEffect(() => {
        listAll(storageRef).catch((error) => {
            console.error('Error listing images: ', error);
        });
    }, []);

    const handleStateImageChange = (e) => {
        const image = e.target.files[0];
        setStateImage(image);
    };

    const handlePlaceImageChange = (e) => {
        const image = e.target.files[0];
        setPlaceImage(image);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Convert formationDate to a JavaScript Date object
            const formationDateObj = new Date(formationDate);

            // Validate if the formation date is valid
            if (isNaN(formationDateObj)) {
                alert('Invalid formation date');
                return;
            }

            // Upload images
            await Promise.all([
                uploadFile(stateImage),
                uploadFile(placeImage)
            ]).then(async ([stateUpload, placeUpload]) => {
                const stateImageUrl = await getDownloadURL(stateUpload);
                const placeImageUrl = await getDownloadURL(placeUpload);

                // Add document to Firestore
                await addDoc(collection(Firestore, 'state'), {
                    state,
                    capital,
                    stateImage: stateImageUrl,
                    stateDescription,
                    famousPlace,
                    placeImage: placeImageUrl,
                    placeDescription,
                    formationDate: Timestamp.fromDate(new Date(formationDateObj.setHours(0, 0, 0, 0))),
                    governor,
                    population: parseInt(population),
                    chiefMinister
                });

                setShowModal(true); // Show modal on successful submission
                setTimeout(() => {
                    setShowModal(false); // Hide modal after 3 seconds
                    navigate('/'); // Redirect to success page
                }, 3000);
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl font-semibold text-center">State Form</h2>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 text-left">State:</label>
                        <select
                            id="state"
                            onChange={(e) => setState(e.target.value)}
                            value={state}
                            required
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select State</option>
                            {indianStates.map((stateName, index) => (
                                <option key={index} value={stateName}>{stateName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="capital" className="block text-sm font-medium text-gray-700 text-left">Capital:</label>
                        <input
                            id="capital"
                            onChange={(e) => setCapital(e.target.value)}
                            value={capital}
                            type="text"
                            required
                            placeholder="Enter Capital"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="stateImage" className="block text-sm font-medium text-gray-700 text-left">State Image:</label>
                        <input
                            id="stateImage"
                            onChange={handleStateImageChange}
                            type="file"
                            accept="image/*"
                            required
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="stateDescription" className="block text-sm font-medium text-gray-700 text-left">State Description:</label>
                        <textarea
                            id="stateDescription"
                            onChange={(e) => setStateDescription(e.target.value)}
                            value={stateDescription}
                            rows="4"
                            required
                            placeholder="Enter State Description"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="famousPlace" className="block text-sm font-medium text-gray-700 text-left">Famous Place:</label>
                        <input
                            id="famousPlace"
                            onChange={(e) => setFamousPlace(e.target.value)}
                            value={famousPlace}
                            type="text"
                            required
                            placeholder="Enter Famous Place"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="placeImage" className="block text-sm font-medium text-gray-700 text-left">Place Image:</label>
                        <input
                            id="placeImage"
                            onChange={handlePlaceImageChange}
                            type="file"
                            accept="image/*"
                            required
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="placeDescription" className="block text-sm font-medium text-gray-700 text-left">Place Description:</label>
                        <textarea
                            id="placeDescription"
                            onChange={(e) => setPlaceDescription(e.target.value)}
                            value={placeDescription}
                            rows="4"
                            required
                            placeholder="Enter Place Description"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="formationDate" className="block text-sm font-medium text-gray-700 text-left">Formation Date:</label>
                        <input
                            id="formationDate"
                            onChange={(e) => setFormationDate(e.target.value)}
                            value={formationDate}
                            type="date"
                            required
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="governor" className="block text-sm font-medium text-gray-700 text-left">State Governor:</label>
                        <input
                            id="governor"
                            onChange={(e) => setGovernor(e.target.value)}
                            value={governor}
                            type="text"
                            required
                            placeholder="Enter State Governor"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="population" className="block text-sm font-medium text-gray-700 text-left">State Population:</label>
                        <input
                            id="population"
                            onChange={(e) => setPopulation(e.target.value)}
                            value={population}
                            type="number"
                            required
                            placeholder="Enter State Population"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="chiefMinister" className="block text-sm font-medium text-gray-700 text-left">Chief Minister:</label>
                        <input
                            id="chiefMinister"
                            onChange={(e) => setChiefMinister(e.target.value)}
                            value={chiefMinister}
                            type="text"
                            required
                            placeholder="Enter Chief Minister"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Submit
                    </button>
                </form>
            </div>
            {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-green-500 text-lg font-semibold">Data stored successfully!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminForm;
