import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-[#ce8a5c] py-8 px-3'>
            <div className='container mx-auto border-top flex flex-col lg:flex-row justify-between items-center'>
                <p><br />All rights reserved &copy; 2024</p>
                <p className='text-white font-poppins font-bold text-center lg:text-center'>Tour India <br /><span className='text-gray-800'>Made with ♥️ by Aryan Kumar</span></p>
                <div className='flex flex-col lg:flex-row gap-x-8 gap-y-4 list-none'>
                    <a href='https://github.com/Aryank728'><br />Github</a>
                    <a href='https://www.linkedin.com/in/Aryank728'><br />LinkedIn</a>
                    <a href='https://aryankr.netlify.app'><br />Portfolio</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
