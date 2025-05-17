import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav class="bg-white border-b border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                        Create your own Adventure
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                        >
                            Intro
                        </Link>

                        <Link
                            to="/cyoa"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                        >
                            Play
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;