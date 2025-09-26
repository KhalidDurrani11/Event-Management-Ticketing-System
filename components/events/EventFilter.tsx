
import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../../types';
import { CATEGORIES } from '../../constants';

interface EventFilterProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ selectedCategory, setSelectedCategory, searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
      <div className="w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search for an event..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-indigo-500 transition"
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {CATEGORIES.map(category => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full relative ${
              selectedCategory === category
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {selectedCategory === category && (
              <motion.div
                layoutId="active-category-pill"
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default EventFilter;
