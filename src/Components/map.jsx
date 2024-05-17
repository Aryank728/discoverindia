import React from "react";

const IndiaMap = () => {
    const handleStateClick = (stateName) => {
        alert(`Clicked on ${stateName}`);
        // You can add more logic here to handle the click event
    };

    return (
        <div className="w-full h-full flex justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 1000"
                className="w-full h-auto"
            >
                <path
                    id="Jammu and Kashmir"
                    d="M137.4,121.8 L130.3,124.8 L121.2,134.8 L121.6,137.5 L127.8,135.8 Z"
                    fill="#00FF00"
                    stroke="#000"
                    onClick={() => handleStateClick("Jammu and Kashmir")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#00FF00")}
                />
                <path
                    id="Punjab"
                    d="M245.4,234.8 L239.3,237.8 L230.2,247.8 L230.6,250.5 L236.8,248.8 Z"
                    fill="#FF00FF"
                    stroke="#000"
                    onClick={() => handleStateClick("Punjab")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#FF00FF")}
                />
                <path
                    id="Himachal Pradesh"
                    d="M120,230 L130,240 L140,250 L150,260 L160,270"
                    fill="#FFA500"
                    stroke="#000"
                    onClick={() => handleStateClick("Himachal Pradesh")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#FFA500")}
                />
                <path
                    id="Uttar Pradesh"
                    d="M330,340 L340,350 L350,360 L360,370 L370,380"
                    fill="#0000FF"
                    stroke="#000"
                    onClick={() => handleStateClick("Uttar Pradesh")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#0000FF")}
                />
                <path
                    id="Rajasthan"
                    d="M220,330 L230,340 L240,350 L250,360 L260,370"
                    fill="#FF0000"
                    stroke="#000"
                    onClick={() => handleStateClick("Rajasthan")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#FF0000")}
                />
                <path
                    id="Gujarat"
                    d="M130,430 L140,440 L150,450 L160,460 L170,470"
                    fill="#00FFFF"
                    stroke="#000"
                    onClick={() => handleStateClick("Gujarat")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#00FFFF")}
                />
                <path
                    id="Maharashtra"
                    d="M270,450 L280,460 L290,470 L300,480 L310,490"
                    fill="#FFD700"
                    stroke="#000"
                    onClick={() => handleStateClick("Maharashtra")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#FFD700")}
                />
                <path
                    id="Karnataka"
                    d="M380,570 L390,580 L400,590 L410,600 L420,610"
                    fill="#FF6347"
                    stroke="#000"
                    onClick={() => handleStateClick("Karnataka")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#FF6347")}
                />
                <path
                    id="Andhra Pradesh"
                    d="M500,690 L510,700 L520,710 L530,720 L540,730"
                    fill="#8A2BE2"
                    stroke="#000"
                    onClick={() => handleStateClick("Andhra Pradesh")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#8A2BE2")}
                />
                <path
                    id="Tamil Nadu"
                    d="M620,810 L630,820 L640,830 L650,840 L660,850"
                    fill="#7FFF00"
                    stroke="#000"
                    onClick={() => handleStateClick("Tamil Nadu")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#7FFF00")}
                />
                <path
                    id="Kerala"
                    d="M740,930 L750,940 L760,950 L770,960 L780,970"
                    fill="#DC143C"
                    stroke="#000"
                    onClick={() => handleStateClick("Kerala")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#DC143C")}
                />
                <path
                    id="Odisha"
                    d="M210,450 L220,460 L230,470 L240,480 L250,490"
                    fill="#8B4513"
                    stroke="#000"
                    onClick={() => handleStateClick("Odisha")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#8B4513")}
                />
                <path
                    id="West Bengal"
                    d="M320,550 L330,560 L340,570 L350,580 L360,590"
                    fill="#2E8B57"
                    stroke="#000"
                    onClick={() => handleStateClick("West Bengal")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#2E8B57")}
                />
                <path
                    id="Assam"
                    d="M430,650 L440,660 L450,670 L460,680 L470,690"
                    fill="#4682B4"
                    stroke="#000"
                    onClick={() => handleStateClick("Assam")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#4682B4")}
                />
                <path
                    id="Bihar"
                    d="M540,750 L550,760 L560,770 L570,780 L580,790"
                    fill="#D2691E"
                    stroke="#000"
                    onClick={() => handleStateClick("Bihar")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#D2691E")}
                />
                <path
                    id="Madhya Pradesh"
                    d="M650,850 L660,860 L670,870 L680,880 L690,890"
                    fill="#B8860B"
                    stroke="#000"
                    onClick={() => handleStateClick("Madhya Pradesh")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#B8860B")}
                />
                <path
                    id="Chhattisgarh"
                    d="M760,950 L770,960 L780,970 L790,980 L800,990"
                    fill="#556B2F"
                    stroke="#000"
                    onClick={() => handleStateClick("Chhattisgarh")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#556B2F")}
                />
                <path
                    id="Jharkhand"
                    d="M870,1050 L880,1060 L890,1070 L900,1080 L910,1090"
                    fill="#6A5ACD"
                    stroke="#000"
                    onClick={() => handleStateClick("Jharkhand")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#6A5ACD")}
                />
                <path
                    id="Sikkim"
                    d="M980,1150 L990,1160 L1000,1170 L1010,1180 L1020,1190"
                    fill="#FF4500"
                    stroke="#000"
                    onClick={() => handleStateClick("Sikkim")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#FF4500")}
                />
                <path
                    id="Nagaland"
                    d="M1090,1250 L1100,1260 L1110,1270 L1120,1280 L1130,1290"
                    fill="#DA70D6"
                    stroke="#000"
                    onClick={() => handleStateClick("Nagaland")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#DA70D6")}
                />
                <path
                    id="Meghalaya"
                    d="M1200,1350 L1210,1360 L1220,1370 L1230,1380 L1240,1390"
                    fill="#EEE8AA"
                    stroke="#000"
                    onClick={() => handleStateClick("Meghalaya")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#EEE8AA")}
                />
                <path
                    id="Tripura"
                    d="M1310,1450 L1320,1460 L1330,1470 L1340,1480 L1350,1490"
                    fill="#98FB98"
                    stroke="#000"
                    onClick={() => handleStateClick("Tripura")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#98FB98")}
                />
                <path
                    id="Manipur"
                    d="M1420,1550 L1430,1560 L1440,1570 L1450,1580 L1460,1590"
                    fill="#AFEEEE"
                    stroke="#000"
                    onClick={() => handleStateClick("Manipur")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#AFEEEE")}
                />
                <path
                    id="Mizoram"
                    d="M1530,1650 L1540,1660 L1550,1670 L1560,1680 L1570,1690"
                    fill="#DDA0DD"
                    stroke="#000"
                    onClick={() => handleStateClick("Mizoram")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#DDA0DD")}
                />
                <path
                    id="Arunachal Pradesh"
                    d="M1640,1750 L1650,1760 L1660,1770 L1670,1780 L1680,1790"
                    fill="#F0E68C"
                    stroke="#000"
                    onClick={() => handleStateClick("Arunachal Pradesh")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#F0E68C")}
                />
                <path
                    id="Goa"
                    d="M1750,1850 L1760,1860 L1770,1870 L1780,1880 L1790,1890"
                    fill="#E6E6FA"
                    stroke="#000"
                    onClick={() => handleStateClick("Goa")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#E6E6FA")}
                />
                <path
                    id="Puducherry"
                    d="M1860,1950 L1870,1960 L1880,1970 L1890,1980 L1900,1990"
                    fill="#B0C4DE"
                    stroke="#000"
                    onClick={() => handleStateClick("Puducherry")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#B0C4DE")}
                />
                <path
                    id="Dadra and Nagar Haveli and Daman and Diu"
                    d="M1970,2050 L1980,2060 L1990,2070 L2000,2080 L2010,2090"
                    fill="#3CB371"
                    stroke="#000"
                    onClick={() => handleStateClick("Dadra and Nagar Haveli and Daman and Diu")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#3CB371")}
                />
                <path
                    id="Lakshadweep"
                    d="M2080,2150 L2090,2160 L2100,2170 L2110,2180 L2120,2190"
                    fill="#808000"
                    stroke="#000"
                    onClick={() => handleStateClick("Lakshadweep")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#808000")}
                />
                <path
                    id="Andaman and Nicobar Islands"
                    d="M2190,2250 L2200,2260 L2210,2270 L2220,2280 L2230,2290"
                    fill="#8B0000"
                    stroke="#000"
                    onClick={() => handleStateClick("Andaman and Nicobar Islands")}
                    onMouseEnter={(e) => (e.currentTarget.style.fill = "#F53")}
                    onMouseLeave={(e) => (e.currentTarget.style.fill = "#8B0000")}
                />
            </svg>
        </div>
    );
};

export default IndiaMap;
