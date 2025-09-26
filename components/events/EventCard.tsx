
import React from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../types';
import { useNavigation } from '../../context/NavigationContext';
import { MapPinIcon, CalendarIcon } from '../common/Icons';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { navigate } = useNavigation();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -10, scale: 1.03, boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.1)" }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={() => navigate({ name: 'event-details', params: { id: event.id } })}
    >
      <motion.div 
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full"
      >
        <div className="relative">
          <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
           <div className="absolute top-2 right-2 bg-white/80 dark:bg-gray-900/80 text-indigo-600 dark:text-indigo-400 text-sm font-bold px-3 py-1 rounded-full backdrop-blur-sm">
            PKR {event.price.toLocaleString()}
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm font-semibold text-indigo-500 dark:text-indigo-400 mb-1">{event.category}</p>
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{event.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPinIcon className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventCard;
