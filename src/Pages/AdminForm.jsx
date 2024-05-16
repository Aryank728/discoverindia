import React, { useState } from 'react';
import { collection, addDoc, Timestamp, getFirestore } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { app, image } from '../firebase'; // Adjust the import according to your setup
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
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const uploadImage = async (imageFile, folder) => {
        const imageRef = ref(image, `${folder}/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile, {
            contentType: imageFile.type,
        });
        console.log(`${folder} image uploaded successfully`);
        return imageRef.fullPath;
    };

    const handleStateImageChange = (e) => {
        setStateImage(e.target.files[0]);
    };

    const handlePlaceImageChange = (e) => {
        setPlaceImage(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formationDateObj = new Date(formationDate);

            if (isNaN(formationDateObj)) {
                console.error('Invalid formation date');
                return;
            }

            const stateImagePath = await uploadImage(stateImage, 'stateimage');
            const placeImagePath = await uploadImage(placeImage, 'placeimage');

            await addDoc(collection(Firestore, 'states'), {
                state,
                capital,
                stateDescription,
                famousPlace,
                placeDescription,
                formationDate: Timestamp.fromDate(formationDateObj),
                governor,
                population: parseInt(population),
                chiefMinister,
                stateImagePath,
                placeImagePath,
            });
            console.log('Document added successfully');
            clearForm();
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                clearForm();  // <--- Clear form after successful submission
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const clearForm = () => {
        setState('');
        setCapital('');
        setStateImage(null);
        setStateDescription('');
        setFamousPlace('');
        setPlaceImage(null);
        setPlaceDescription('');
        setFormationDate('');
        setGovernor('');
        setPopulation('');
        setChiefMinister('');
        document.getElementById('stateImage').value = ''; // <--- Reset file input
        document.getElementById('placeImage').value = ''; // <--- Reset file input
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
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">Form submitted successfully!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminForm;
