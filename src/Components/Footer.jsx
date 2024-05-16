import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-[#ce8a5c] py-8 px-3'>
            <div className='container mx-auto border-top lg:flex justify-between items-center'>
                <p><br />All rights reserved &copy; 2024</p>
                <p className='text-white font-poppins font-bold text-center'>4धाम <br /><span className='text-gray-800'>Made with ♥️ by Aryan Kumar</span></p>
                <p className='flex lg:flex-row flex-col gap-x-8 gap-y-4 list-none'>
                    <a href='https://github.com/Aryank728'><br />Github</a>
                    <a href='https://www.linkedin.com/in/Aryank728'><br />LinkedIn</a>
                    <a href='https://aryankr.netlify.app'><br />Portfolio</a>
                </p>
            </div>
        </footer>
    )
}

export default Footer;