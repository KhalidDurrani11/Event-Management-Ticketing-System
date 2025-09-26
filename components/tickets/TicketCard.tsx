
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../types';
import { MapPinIcon, CalendarIcon, DownloadIcon } from '../common/Icons';

interface TicketCardProps {
  event: Event;
}

// Simple confetti component for success animation
const Confetti: React.FC = () => {
    const colors = ['#a855f7', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6'];
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full animate-confetti-fall"
                    style={{
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 8 + 4}px`,
                        height: `${Math.random() * 8 + 4}px`,
                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${Math.random() * 3 + 2}s`
                    }}
                />
            ))}
        </div>
    );
};


const TicketCard: React.FC<TicketCardProps> = ({ event }) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  
  // TODO: Replace with a real user ID from Clerk and booking ID from Supabase
  const qrData = JSON.stringify({ eventId: event.id, userId: 'user_12345', bookingId: 'booking_abcde' });
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&bgcolor=ffffff&color=0d1117`;

  const handleDownload = useCallback(() => {
    // This is a placeholder for a more robust image generation (e.g., html2canvas)
    alert("Ticket download functionality would be implemented here.");
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] relative">
      {showConfetti && <Confetti />}
      <motion.h2 
        className="text-3xl font-bold mb-4 text-green-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Booking Successful!
      </motion.h2>
      <motion.div
        ref={ticketRef}
        className="w-full max-w-sm bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl overflow-hidden relative"
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, delay: 0.5 }}
      >
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <h3 className="text-2xl font-bold">{event.title}</h3>
          <p className="text-sm opacity-80">{event.organizer}</p>
        </div>
        
        <div className="p-6">
            <div className="flex items-center mb-4 text-gray-700 dark:text-gray-300">
                <CalendarIcon className="w-5 h-5 mr-3 text-indigo-400" />
                <span>{new Date(event.date).toDateString()} at {event.time}</span>
            </div>
            <div className="flex items-center mb-6 text-gray-700 dark:text-gray-300">
                <MapPinIcon className="w-5 h-5 mr-3 text-indigo-400" />
                <span>{event.location}</span>
            </div>

            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-inner">
                 {/* QR code generated via qrcode.react (placeholder) */}
                <img src={qrCodeUrl} alt="QR Code for your ticket" className="w-48 h-48" />
            </div>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">Scan this QR code at the entrance</p>
        </div>

        <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-4 w-8 h-8 bg-gray-50 dark:bg-gray-900 rounded-full"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 -mr-4 w-8 h-8 bg-gray-50 dark:bg-gray-900 rounded-full"></div>
        <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-600 mx-6"></div>
        <div className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
            {/* Placeholder for Clerk user name */}
            <p>Ticket Holder: <strong>John Doe</strong></p>
        </div>

      </motion.div>
       <motion.button
            onClick={handleDownload}
            className="mt-8 flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg"
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(79, 70, 229, 0.4)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
        >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download Ticket
        </motion.button>
    </div>
  );
};

export default TicketCard;
