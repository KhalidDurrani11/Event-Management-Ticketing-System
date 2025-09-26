
import React from 'react';
import { TicketIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
             <TicketIcon className="h-8 w-8 text-indigo-500" />
             <span className="ml-2 text-xl font-bold text-gray-800 dark:text-gray-200">Eventify</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Eventify. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
             {/* Social media icons can be added here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
