import React from "react";
import { Link } from "react-router-dom";
import logo from "../Layout/Logod.png";

const Footer = () => {
    return (
        <div className="bg-[#1a1a1a] text-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-5 py-16">
                <ul className="text-center sm:text-start flex flex-col items-center cursor-pointer">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-[150px] h-auto"
                       
                    />
                    <p className="mt-4 text-lg font-medium">เว็บสำหรับโปรเจ็คจบค้าบ</p>
                    <div className="flex items-center mt-4">

                    </div>
                </ul>
            </div>
            <div className="text-center py-4 border-t border-gray-700">
                <p className="text-sm">  อาร์ทบาสเองค้าบ</p>
            </div>
        </div>
    );
};

export default Footer;
