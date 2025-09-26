import React, { useState, useEffect } from 'react';
// FIX: Import `AnimatePresence` from `framer-motion` to resolve reference errors.
import { motion, AnimatePresence } from 'framer-motion';
import { Event, Attendee } from '../../types';
import { EVENTS } from '../../constants';
import QRScanner from '../common/QRScanner';

const pageVariants = {
  initial: { opacity: 0, scale: 0.9 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.9 },
};

// Mock attendees
const MOCK_ATTENDEES: Attendee[] = [
    { id: 'att1', eventId: 1, userId: 'user1', userName: 'Alice', status: 'checked-in' },
    { id: 'att2', eventId: 1, userId: 'user2', userName: 'Bob', status: 'pending' },
    { id: 'att3', eventId: 1, userId: 'user3', userName: 'Charlie', status: 'pending' },
];

const AnimatedCounter = ({ value }: { value: number }) => {
    // This is a simplified counter; a library like react-spring would be better
    // For this environment, we'll just show the number with an animation
    return (
        <motion.span
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block"
        >
            {value}
        </motion.span>
    )
}

const Dashboard: React.FC = () => {
    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [ticketCount, setTicketCount] = useState(1);

    useEffect(() => {
        // TODO: Fetch events created by the organizer from Supabase
        setMyEvents(EVENTS.slice(0, 2)); // Mock data
        
        // TODO: Fetch attendees list from Supabase
        // TODO: Set up Supabase Realtime subscription for attendees
        setAttendees(MOCK_ATTENDEES);
        
        // TODO: Set up Supabase Realtime for ticket count
        const interval = setInterval(() => {
            setTicketCount(prev => prev + 1);
        }, 5000); // Simulate a new ticket sold
        
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
            className="space-y-12"
        >
            <h1 className="text-4xl font-bold">Organizer Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-500 dark:text-gray-400">Total Events</h3>
                    <p className="text-4xl font-bold text-indigo-500">{myEvents.length}</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-500 dark:text-gray-400">Tickets Sold (Event 1)</h3>
                    <p className="text-4xl font-bold text-purple-500">
                       <AnimatedCounter value={ticketCount} />
                    </p>
                </div>
                 <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-500 dark:text-gray-400">QR Validation</h3>
                    <QRScanner />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* My Events List */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">My Events</h2>
                    <ul className="space-y-3">
                        {myEvents.map(event => (
                            <li key={event.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
                                <span>{event.title}</span>
                                <span className="text-sm text-gray-500">{event.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Real-time Attendees List */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">Attendees (Live for Synthwave Dreams)</h2>
                    <ul className="space-y-3 h-48 overflow-y-auto">
                        <AnimatePresence>
                        {attendees.map(attendee => (
                            <motion.li 
                                key={attendee.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center"
                            >
                                <span>{attendee.userName}</span>
                                <span className={`px-2 py-0.5 text-xs rounded-full ${attendee.status === 'checked-in' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'}`}>
                                    {attendee.status}
                                </span>
                            </motion.li>
                        ))}
                        </AnimatePresence>
                    </ul>
                </div>
            </div>

        </motion.div>
    );
};

export default Dashboard;