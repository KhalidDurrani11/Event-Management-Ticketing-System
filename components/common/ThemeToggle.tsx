
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon } from './Icons';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-14 h-7 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 cursor-pointer"
      aria-label="Toggle theme"
    >
      <motion.div
        className="w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        style={{ marginLeft: theme === 'dark' ? 'auto' : '0' }}
      >
        {theme === 'dark' ? <MoonIcon className="text-gray-700 h-3 w-3" /> : <SunIcon className="text-yellow-500 h-4 w-4" />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
