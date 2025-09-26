
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event } from '../../types';
import { EVENTS } from '../../constants';
import { SkeletonEventDetails } from '../common/Skeleton';
import BookingModal from '../tickets/BookingModal';
import TicketCard from '../tickets/TicketCard';
import { MapPinIcon, CalendarIcon, ClockIcon } from '../common/Icons';

interface EventDetailsProps {
  eventId: number;
}

const pageVariants = {
  initial: { opacity: 0, x: '100vw' },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: '-100vw' },
};

const EventDetails: React.FC<EventDetailsProps> = ({ eventId }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  useEffect(() => {
    // TODO: Fetch event details from Supabase
    setLoading(true);
    const timer = setTimeout(() => {
      const foundEvent = EVENTS.find(e => e.id === eventId);
      setEvent(foundEvent || null);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [eventId]);

  const handleBookingSuccess = () => {
    setIsModalOpen(false);
    setTimeout(() => {
        setIsBookingSuccess(true);
    }, 300); // Wait for modal to close
  }

  if (loading) return <SkeletonEventDetails />;

  if (!event) return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={{ duration: 0.5 }}>
        <p className="text-center text-2xl">Event not found.</p>
    </motion.div>
  );

  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={{ duration: 0.5 }}>
      {isBookingSuccess ? (
        <TicketCard event={event} />
      ) : (
        <div className="max-w-4xl mx-auto">
          <motion.div 
            layoutId={`event-card-image-${eventId}`}
            className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-8"
          >
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="w-full md:w-2/3">
                <p className="text-indigo-500 dark:text-indigo-400 font-semibold">{event.category}</p>
                <h1 className="text-4xl md:text-5xl font-extrabold my-2 text-gray-900 dark:text-white">{event.title}</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Organized by {event.organizer}</p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{event.longDescription}</p>
            </div>
            <div className="w-full md:w-1/3 md:pl-8 mt-8 md:mt-0">
                <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                    <div className="flex items-center mb-4">
                        <CalendarIcon className="w-6 h-6 mr-3 text-indigo-500" />
                        <span className="font-semibold">{new Date(event.date).toDateString()}</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <ClockIcon className="w-6 h-6 mr-3 text-indigo-500" />
                        <span className="font-semibold">{event.time}</span>
                    </div>
                    <div className="flex items-center mb-6">
                        <MapPinIcon className="w-6 h-6 mr-3 text-indigo-500" />
                        <span className="font-semibold">{event.location}</span>
                    </div>
                    <div className="text-center mb-6">
                        <p className="text-3xl font-bold text-gray-800 dark:text-white">PKR {event.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{event.availableSeats} seats available</p>
                    </div>
                    <motion.button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg"
                        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(79, 70, 229, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Book Ticket
                    </motion.button>
                </div>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {isModalOpen && (
            <BookingModal 
                event={event} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={handleBookingSuccess} 
            />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventDetails;
