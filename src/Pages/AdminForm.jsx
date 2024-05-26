import React, { useState } from 'react';
import { collection, addDoc, doc, setDoc, Timestamp, getFirestore, getDoc } from 'firebase/firestore';
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
    const [formationDate, setFormationDate] = useState('');
    const [governor, setGovernor] = useState('');
    const [population, setPopulation] = useState('');
    const [chiefMinister, setChiefMinister] = useState('');
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

    const handleStateImageChange = (e) => {
        setStateImage(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formationDateObj = new Date(formationDate);

            if (isNaN(formationDateObj)) {
                console.error('Invalid formation date');
                return;
            }
            setIsSubmitting(true);

            const stateDocRef = doc(Firestore, 'states', state.toLowerCase().replace(/\s+/g, ''));
            const stateDoc = await getDoc(stateDocRef);

            let stateImagePath = '';

            if (stateImage) {
                stateImagePath = await uploadImage(stateImage, 'stateimage');
            }

            const stateData = {
                state,
                capital,
                stateDescription,
                formationDate: Timestamp.fromDate(formationDateObj),
                governor,
                population,
                chiefMinister,
            };

            if (stateImagePath) {
                stateData.stateImagePath = stateImagePath;
            }

            if (stateDoc.exists()) {
                await setDoc(stateDocRef, stateData);
                console.log('Document updated successfully');
            } else {
                await setDoc(stateDocRef, stateData);
                console.log('Document added successfully');
            }

            clearForm();
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
        } catch (error) {
            console.error('Error adding or updating document: ', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearForm = () => {
        setState('');
        setCapital('');
        setStateImage(null);
        setStateDescription('');
        setFormationDate('');
        setGovernor('');
        setPopulation('');
        setChiefMinister('');
        document.getElementById('stateImage').value = ''; // <--- Reset file input
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h2 className="col-span-1 md:col-span-2 text-3xl font-bold text-center text-blue-600">State Form</h2>
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
                        <label htmlFor="capital" className="block text-sm font-semibold text-gray-700">Capital:</label>
                        <input
                            id="capital"
                            onChange={(e) => setCapital(e.target.value)}
                            value={capital}
                            type="text"
                            required
                            placeholder="Enter Capital"
                            className="mt-1 p-3 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="stateImage" className="block text-sm font-semibold text-gray-700">State Image:</label>
                        <input
                            id="stateImage"
                            onChange={handleStateImageChange}
                            type="file"
                            accept="image/*"
                            className="mt-1 p-3 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="stateDescription" className="block text-sm font-semibold text-gray-700">State Description:</label>
                        <textarea
                            id="stateDescription"
                            onChange={(e) => setStateDescription(e.target.value)}
                            value={stateDescription}
                            rows="4"
                            required
                            placeholder="Enter State Description"
                            className="mt-1 p-3 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="formationDate" className="block text-sm font-semibold text-gray-700">Formation Date:</label>
                        <input
                            id="formationDate"
                            onChange={(e) => setFormationDate(e.target.value)}
                            value={formationDate}
                            type="date"
                            required
                            className="mt-1 p-3 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="governor" className="block text-sm font-semibold text-gray-700">Governor:</label>
                        <input
                            id="governor"
                            onChange={(e) => setGovernor(e.target.value)}
                            value={governor}
                            type="text"
                            required
                            placeholder="Enter Governor"
                            className="mt-1 p-3 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="population" className="block text-sm font-semibold text-gray-700">Population:</label>
                        <input
                            id="population"
                            onChange={(e) => setPopulation(e.target.value)}
                            value={population}
                            type="text"
                            required
                            placeholder="Enter Population"
                            className="mt-1 p-3 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="chiefMinister" className="block text-sm font-semibold text-gray-700">Chief Minister:</label>
                        <input
                            id="chiefMinister"
                            onChange={(e) => setChiefMinister(e.target.value)}
                            value={chiefMinister}
                            type="text"
                            required
                            placeholder="Enter Chief Minister"
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
                            <h3 className="text-2xl font-semibold text-blue-600">State Added Successfully!</h3>
                            <p className="mt-4 text-gray-700">The state has been added to the database.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminForm;
