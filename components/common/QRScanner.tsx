import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TicketStorage } from '../../services/ticketStorage';
import { EVENTS } from '../../constants';

const QRScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
    booking?: any;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setScanResult(result);
      validateQRCode(result);
    };
    reader.readAsText(file);
  };

  const validateQRCode = (qrData: string) => {
    try {
      // Parse QR code data (assuming it contains booking information)
      const bookings = TicketStorage.getAllBookings();
      
      // Check if QR code matches any booking
      const matchingBooking = bookings.find(booking => 
        booking.qrCode.includes(qrData) || qrData.includes(booking.id)
      );

      if (matchingBooking) {
        setValidationResult({
          isValid: true,
          message: 'Ticket is valid! Entry granted.',
          booking: matchingBooking
        });
      } else {
        setValidationResult({
          isValid: false,
          message: 'Invalid ticket. Entry denied.'
        });
      }
    } catch (error) {
      setValidationResult({
        isValid: false,
        message: 'Error validating ticket. Please try again.'
      });
    }
  };

  const handleManualInput = () => {
    const manualCode = prompt('Enter QR code data manually:');
    if (manualCode) {
      setScanResult(manualCode);
      validateQRCode(manualCode);
    }
  };

  const resetScanner = () => {
    setScanResult('');
    setValidationResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {!isScanning && !scanResult && (
        <div className="space-y-3">
          <motion.button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Upload QR Image
          </motion.button>
          
          <motion.button
            onClick={handleManualInput}
            className="w-full py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Manual Input
          </motion.button>
        </div>
      )}


      {scanResult && (
        <div className="space-y-3">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Scanned Data:
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 break-all">
              {scanResult}
            </p>
          </div>

          {validationResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                validationResult.isValid
                  ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                  : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className={`w-3 h-3 rounded-full mr-2 ${
                  validationResult.isValid ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                <p className={`font-semibold ${
                  validationResult.isValid
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {validationResult.message}
                </p>
              </div>
              
              {validationResult.booking && (
                <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Event:</strong> {EVENTS.find(e => e.id === validationResult.booking.eventId)?.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Booking ID:</strong> {validationResult.booking.id}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Booked on:</strong> {new Date(validationResult.booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          <motion.button
            onClick={resetScanner}
            className="w-full py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Scan Another Ticket
          </motion.button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default QRScanner;
