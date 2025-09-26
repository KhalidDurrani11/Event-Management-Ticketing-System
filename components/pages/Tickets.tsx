import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { Booking } from '../../types';
import { TicketStorage } from '../../services/ticketStorage';
import { EVENTS } from '../../constants';
import { useNavigation } from '../../context/NavigationContext';
import { TicketIcon, CalendarIcon, MapPinIcon } from '../common/Icons';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const Tickets: React.FC = () => {
  const { user } = useUser();
  const { navigate } = useNavigation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userBookings = TicketStorage.getBookingsByUser(user.id);
      setBookings(userBookings);
    }
    setLoading(false);
  }, [user]);

  const getEventById = (eventId: number) => {
    return EVENTS.find(event => event.id === eventId);
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      TicketStorage.deleteBooking(bookingId);
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    }
  };

  if (!user) {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
        className="text-center py-20"
      >
        <h1 className="text-4xl font-bold mb-4">Please Sign In</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          You need to be signed in to view your tickets.
        </p>
        <motion.button
          onClick={() => navigate({ name: 'home' })}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go to Home
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Tickets
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Manage your event bookings and access your tickets
        </motion.p>
      </div>

      {/* Tickets List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TicketIcon className="w-24 h-24 text-gray-400 dark:text-gray-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">
            No Tickets Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-500 mb-8">
            You haven't booked any events yet. Start exploring amazing events!
          </p>
          <motion.button
            onClick={() => navigate({ name: 'home' })}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Events
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {bookings.map((booking, index) => {
            const event = getEventById(booking.eventId);
            if (!event) return null;

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 text-indigo-600 dark:text-indigo-400 text-sm font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    PKR {event.price.toLocaleString()}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <TicketIcon className="w-5 h-5 text-indigo-500 mr-2" />
                    <span className="text-sm font-semibold text-indigo-500 dark:text-indigo-400">
                      Ticket #{booking.id.slice(-8)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">QR Code:</span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        Booked on {booking.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <img 
                        src={booking.qrCode} 
                        alt="Ticket QR Code" 
                        className="w-16 h-16 rounded border border-gray-200 dark:border-gray-600"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden text-xs text-gray-500 dark:text-gray-400">
                        QR Code unavailable
                      </div>
                      <motion.button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </motion.button>
                    </div>
                    
                    {/* Download Button */}
                    <motion.button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = booking.qrCode;
                        link.download = `ticket-${event.title.replace(/\s+/g, '-')}-${booking.id.slice(-8)}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="w-full py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Download Ticket
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Tickets;
