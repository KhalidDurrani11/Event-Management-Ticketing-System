
import React from 'react';

export const SkeletonCard: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
    <div className="p-6">
      <div className="h-6 w-3/4 mb-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-1/2 mb-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-5/6 mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

export const SkeletonEventDetails: React.FC = () => (
  <div className="animate-pulse">
    <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mb-8"></div>
    <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
    <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
    </div>
  </div>
);
