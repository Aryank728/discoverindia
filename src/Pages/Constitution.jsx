/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import SlideShow from "../Components/Slides";
import heroBg from "../asset/constitution/constitutionofindia.jpg";
import constitution from "../asset/constitution/COI.pdf"

const Constitution = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const slides = [
        require('../asset/constitution/img_20150108_142136121-700x393.jpg'),
        require('../asset/constitution/img_20150108_141528314-700x393.jpg'),
        require('../asset/constitution/Constituent Assembly.jpg'),
        // Add more image paths as needed
    ];

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const additionalFields = [
        { label: 'Amendments', value: '104' },
        { label: 'Date Effective', value: '26 January, 1950' },
        { label: 'Branches', value: '3 (Executive, Legislature, Judiciary)' },
        { label: 'Authors', value: '1. B. R. Ambedkar \n 2. B. N. Rau \n Surendra Nath Mukharjee' },
    ];
    return (
        <div>
            <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBg})` }}>
                <Navbar />
                <div className="flex items-right justify-center min-h-screen">
                    <div className="container mx-auto text-center text-[#FFFF00] mt-[400px]">
                        <h1 className="lg:text-6xl font-bold lg:leading-normal font-poppins">Constitution of <br /> India</h1>
                    </div>
                </div>
            </div>
            <div className="container mx-auto text-center text-black my-8">
                <p>
                    The Constitution of India is the supreme law of India. The document lays down the framework that demarcates fundamental political code, structure, procedures, powers, and duties of government institutions and sets out fundamental rights, directive principles, and the duties of citizens. It is the longest written constitution of any country. It imparts constitutional supremacy (not parliamentary supremacy, since it was created by a constituent assembly rather than Parliament) and was adopted by its people with a declaration in its preamble. Parliament cannot override the constitution.
                </p>
                <h2 className='contaniner mx-auto text-5xl text-red-400 font-bold text-left mt-6'>Constituent Assembly</h2>
                <p>The constitution was drafted by the Constituent Assembly, which was elected by elected members of the provincial assemblies. The 389-member assembly (reduced to 299 after the partition of India) took almost three years to draft the constitution holding eleven sessions over a 165-day period. Dr. B. R. Ambedkar was a wise constitutional expert, he had studied the constitutions of about 60 countries. Ambedkar is recognised as the "Father of the Constitution of India". In the constitution assembly, a member of the drafting committee, T. T. Krishnamachari said:</p>
                <p className='text-red-800 font-bold'>
                    "Mr. President, Sir, I am one of those in the House who have listened to Dr. Ambedkar very carefully. I am aware of the amount of work and enthusiasm that he has brought to bear on the work of drafting this Constitution. At the same time, I do realise that that amount of attention that was necessary for the purpose of drafting a constitution so important to us at this moment has not been given to it by the Drafting Committee. The House is perhaps aware that of the seven members nominated by you, one had resigned from the House and was replaced. One died and was not replaced. One was away in America and his place was not filled up and another person was engaged in State affairs, and there was a void to that extent. One or two people were far away from Delhi and perhaps reasons of health did not permit them to attend. So it happened ultimately that the burden of drafting this constitution fell on Dr. Ambedkar and I have no doubt that we are grateful to him for having achieved this task in a manner which is undoubtedly commendable."</p>
            </div>

            <div className='w-[70%] h-[1%] relative m-auto mb-6 flex justify-center'>
                <SlideShow slides={slides} />
            </div>
            <div className="text-center">
                <p style={{ fontSize: '2.4rem' }}>
                    <b style={{ color: 'rgb(34, 134, 4)' }}>Download attachment file of constitution of India</b>
                </p>
                <a href={constitution} target="_blank">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-8">
                        Download
                    </button>
                </a>
            </div>



            <Sidebar
                isVisible={isSidebarVisible}
                toggleSidebar={toggleSidebar}
                additionalFields={additionalFields}
            />
            <Footer />
        </div>
    )
}

export default Constitution;
