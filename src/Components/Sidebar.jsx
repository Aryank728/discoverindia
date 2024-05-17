import { useState } from "react";

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            {showSidebar ? (
                <button
                    className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
                    onClick={() => setShowSidebar(!showSidebar)}
                    aria-label="Close sidebar"
                >
                    x
                </button>
            ) : (
                <svg
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="fixed z-30 flex items-center cursor-pointer right-10 top-6"
                    fill="#2563EB"
                    viewBox="0 0 100 80"
                    width="20" // Changed from 40 to 30
                    height="30" // Changed from 40 to 30
                    aria-label="Open sidebar"
                    role="button"
                >
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="100" height="10"></rect>
                    <rect y="60" width="100" height="10"></rect>
                </svg>
            )}

            <div
                className={`top-0 right-0 w-[20vw] bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-10 pl-20 text-white fixed h-full z-40 ease-in-out duration-300 ${showSidebar ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <h3 className="mt-20 text-4xl font-semibold text-white">
                    I am a sidebar
                </h3>
            </div>
        </>
    );
};

export default Sidebar;
