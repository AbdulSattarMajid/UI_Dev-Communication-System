import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link
import logo from "../Images/Logo.png";
import {
    MessageSquare,
    Home,
    Clock,
    Calendar,
    FileText,
    Briefcase,
    LogOut,
} from 'lucide-react';

const navItems = [
    { label: 'Projects', icon: <MessageSquare />, link: '/' }, 
    { label: 'Dashboard', icon: <Home />, link: '#' },
    { label: 'Check In/Out', icon: <Clock />, link: '#' },
    { label: 'Time Table', icon: <Calendar />, link: '#' },
    { label: 'Progress Report', icon: <FileText />, link: '#' },
    { label: 'Holiday Requests', icon: <Calendar />, link: '#' },
    { label: 'My Tasks', icon: <Briefcase />, link: '#' },
    { label: 'Compensate Hours', icon: <Clock />, link: '#' },
];

export default function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div
            className="fixed h-screen w-64 overflow-y-auto text-white px-0 py-5"
            style={{ backgroundColor: '#3949ab' }}
        >
            {/* Logo & user info */}
            <div className="px-4 mb-5">
                <div className="flex justify-center">
                    <div className="relative inline-block w-full max-w-[240px]">
                        <img
                            src={logo}
                            alt="FSPro - Employee Management System"
                            loading="lazy"
                            className="w-full h-auto max-h-[110px] object-contain drop-shadow-sm transition-opacity duration-300"
                        />
                    </div>
                </div>
                <div className="text-sm opacity-80 text-center mt-1">
                    test1 | ID: emp001
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 px-4">
                {navItems.map((item, idx) => {
                    const baseClass = `
                        flex items-center gap-2 px-3 py-2 rounded text-sm transition
                        ${
                            activeIndex === idx
                                ? 'bg-gradient-to-r from-black via-indigo-900 to-blue-500 text-white'
                                : 'bg-[#3949ab] hover:bg-gradient-to-r hover:from-black hover:via-indigo-900 hover:to-blue-500 hover:text-white'
                        }
                    `;

                    return item.label === 'Projects' ? (
                        <Link
                            to={item.link}
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={baseClass}
                        >
                            {React.cloneElement(item.icon, { size: 18 })}
                            {item.label}
                        </Link>
                    ) : (
                        <a
                            key={idx}
                            href={item.link}
                            onClick={() => setActiveIndex(idx)}
                            className={baseClass}
                        >
                            {React.cloneElement(item.icon, { size: 18 })}
                            {item.label}
                        </a>
                    );
                })}

                {/* Logout Button */}
                <a
                    href="#"
                    className="flex items-center gap-2 px-3 py-2 rounded text-sm mt-4 transition bg-[#3949ab] hover:bg-gradient-to-r hover:from-black hover:via-indigo-900 hover:to-blue-500 hover:text-white"
                >
                    <LogOut size={18} />
                    Logout
                </a>
            </nav>
        </div>
    );
}
