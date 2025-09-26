
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { Event } from '../../types';
import { TicketStorage } from '../../services/ticketStorage';
import { useNavigation } from '../../context/NavigationContext';
import { XIcon } from '../common/Icons';

interface BookingModalProps {
  event: Event;
  onClose: () => void;
  onSuccess: () => void;
}

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { 
    y: "0", 
    opacity: 1,
    transition: { delay: 0.2, type: 'spring', stiffness: 120 }
  },
};

const BookingModal: React.FC<BookingModalProps> = ({ event, onClose, onSuccess }) => {
  const { user } = useUser();
  const { navigate } = useNavigation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [qrCode, setQrCode] = useState<string>('');

  const handleConfirmBooking = () => {
    if (!user) {
      alert('Please sign in to book tickets');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      try {
        // Generate QR code
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`Eventify-Ticket-${event.id}-${user.id}-${Date.now()}`)}`;
        
        // Save booking to local storage
        const booking = TicketStorage.saveBooking({
          eventId: event.id,
          userId: user.id,
          qrCode: qrCodeUrl,
        });

        console.log('Booking saved:', booking);
        setQrCode(qrCodeUrl);
        setIsProcessing(false);
        setBookingSuccess(true);
        onSuccess();
      } catch (error) {
        console.error('Error saving booking:', error);
        setIsProcessing(false);
        alert('Failed to book ticket. Please try again.');
      }
    }, 2000);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg m-2 sm:m-4 p-4 sm:p-6 lg:p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 relative"
        variants={modal}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          onClick={onClose}
          whileHover={{ scale: 1.2, rotate: 90 }}
        >
          <XIcon />
        </motion.button>
        
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-white">
          {bookingSuccess ? 'Booking Confirmed!' : 'Confirm Your Booking'}
        </h2>
        <p className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-indigo-500 dark:text-indigo-400">{event.title}</p>
        
        {bookingSuccess ? (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg"
            >
              <div className="text-green-600 dark:text-green-400 text-6xl mb-2">✓</div>
              <p className="text-green-800 dark:text-green-200 font-semibold">
                Your ticket has been booked successfully!
              </p>
            </motion.div>
            
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Your QR Code:</h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center"
              >
                <img 
                  src={qrCode} 
                  alt="Ticket QR Code" 
                  className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg border-2 border-gray-200 dark:border-gray-600 shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden text-sm text-gray-500 dark:text-gray-400">
                  QR Code unavailable
                </div>
              </motion.div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
                Show this QR code at the event entrance
              </p>
              
              {/* Download Button */}
              <motion.button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = qrCode;
                  link.download = `ticket-${event.title.replace(/\s+/g, '-')}-qr.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Ticket
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex justify-between"><span>Ticket Price:</span> <strong>PKR {event.price.toLocaleString()}</strong></div>
              <div className="flex justify-between items-center">
                <span>Quantity:</span> 
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <span className="w-8 text-center font-bold">{quantity}</span>
                  <motion.button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-600 my-2"></div>
              <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
                <span>Total:</span> 
                <span>PKR {(event.price * quantity).toLocaleString()}</span>
              </div>
          </div>
        )}

        {!bookingSuccess && (
          <>
            {!user && (
              <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  ⚠️ Please sign in to book tickets
                </p>
              </div>
            )}
            
            <motion.button
              onClick={handleConfirmBooking}
              disabled={isProcessing || !user}
              className="w-full mt-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isProcessing && user ? { scale: 1.05, boxShadow: "0px 10px 20px rgba(22, 163, 74, 0.4)" } : {}}
              whileTap={!isProcessing && user ? { scale: 0.95 } : {}}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Processing...
                </span>
              ) : !user ? 'Sign In Required' : 'Confirm & Pay'}
            </motion.button>
          </>
        )}
        
        {bookingSuccess && (
          <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
            <motion.button
              onClick={() => navigate({ name: 'tickets' })}
              className="flex-1 py-2 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Tickets
            </motion.button>
            <motion.button
              onClick={onClose}
              className="flex-1 py-2 sm:py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BookingModal;
