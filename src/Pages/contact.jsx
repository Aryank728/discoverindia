import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import LottieAnimation from '../Components/animation';
import contactAnimation from '../asset/animation/Animation - contactus.json';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_x8w0cvf', 'template_4sxlz1o', form.current, 'DVUJRNCOOPvGFcr-a')
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
        e.target.reset();
    };

    return (
        <>
            <Navbar />
            <section className="bg-gray-100 py-12">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-semibold text-center mb-8">Contact Us</h2>
                    <p className="mb-4 text-xl text-center">
                        We would love to hear from you! Whether you have questions, suggestions, or feedback about our website, feel free to reach out to us. Your input is invaluable as we strive to enhance our platform and provide you with the best experience possible.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8">
                        <div className="flex justify-center">
                            <LottieAnimation animationData={contactAnimation} />
                        </div>
                        <form ref={form} onSubmit={sendEmail} className="max-w-md w-full mb-8 md:mb-0 md:mr-8">
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="full_name">Full Name:</label>
                                <input type="text" id="full_name" name="from_name" placeholder="Full Name" required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="email">Email:</label>
                                <input type="email" id="email" name="user_email" placeholder="Email" required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="subject">Subject:</label>
                                <input type="text" id="subject" name="subject" placeholder="Subject" required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2" htmlFor="message">Message:</label>
                                <textarea id="message" name="message" rows="5" placeholder="Message"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mb-2">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;
