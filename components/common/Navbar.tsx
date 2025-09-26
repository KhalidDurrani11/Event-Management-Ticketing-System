
import React from 'react';
import { motion } from 'framer-motion';
import { useUser, UserButton } from '@clerk/clerk-react';
import { useNavigation } from '../../context/NavigationContext';
import ThemeToggle from './ThemeToggle';
import { TicketIcon } from './Icons';

const Navbar: React.FC = () => {
    const { navigate } = useNavigation();
    const { isSignedIn } = useUser();

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md dark:shadow-gray-800">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <motion.div 
                        className="flex items-center cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate({ name: 'home' })}
                    >
                        <TicketIcon className="h-8 w-8 text-indigo-500" />
                        <h1 className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                            Eventify
                        </h1>
                    </motion.div>
                    
                    <div className="flex items-center space-x-4">
                        <motion.button
                            onClick={() => navigate({ name: 'home' })}
                            className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                            whileHover={{ y: -2 }}
                        >
                            Events
                        </motion.button>
                        {isSignedIn && (
                            <motion.button
                                onClick={() => navigate({ name: 'tickets' })}
                                className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                                whileHover={{ y: -2 }}
                            >
                                My Tickets
                            </motion.button>
                        )}
                        <motion.button
                            onClick={() => navigate({ name: 'dashboard' })}
                            className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                             whileHover={{ y: -2 }}
                        >
                            Dashboard
                        </motion.button>
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
                        <ThemeToggle />
                        <div>
                            {isSignedIn ? (
                                <UserButton 
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-8 h-8"
                                        }
                                    }}
                                />
                            ) : (
                                <motion.button
                                    onClick={() => navigate({ name: 'sign-in' })}
                                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Sign In
                                </motion.button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
