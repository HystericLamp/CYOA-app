import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: 'Intro', path: '/'},
        { label: 'Story', path: '/story'}
    ]

    return (
        <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/60 dark:bg-gray-900/60 border-b border-white/30 dark:border-gray-700">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/** Logo */}
                <Link 
                    to="/" 
                    className="text-2xl font-bold tracking-tight text-primary dark:text-white"
                >
                    Create your own Adventure
                </Link>

                {/** Nav Items */}
                <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`relative text-sm font-medium transition-colors duration-300 ${
                                location.pathname === item.path
                                ? "text-primary dark:text-secondary"
                                : "text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-secondary"
                            }`}
                        >
                            {item.label}
                            {location.pathname === item.path && (
                                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-primary dark:bg-secondary rounded-full transition-all duration-300"></span>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-gray-800 dark:text-white"
                aria-label="Toggle Menu"
                >
                {isOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                ) : (
                    <Bars3Icon className="h-6 w-6" />
                )}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 pt-2 flex flex-col space-y-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700">
                {navItems.map((item) => (
                    <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium ${
                        location.pathname === item.path
                        ? "text-primary dark:text-secondary"
                        : "text-gray-800 hover:text-primary dark:text-gray-200 dark:hover:text-secondary"
                    }`}
                    >
                    {item.label}
                    </Link>
                ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;