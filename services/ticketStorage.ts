import { Booking } from '../types';

// Demo ticket storage using localStorage
export class TicketStorage {
  private static STORAGE_KEY = 'eventify_bookings';

  static saveBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const bookings = this.getAllBookings();
    const newBooking: Booking = {
      ...booking,
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    
    bookings.push(newBooking);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
    return newBooking;
  }

  static getAllBookings(): Booking[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const bookings = JSON.parse(stored);
      // Convert date strings back to Date objects
      return bookings.map((booking: any) => ({
        ...booking,
        createdAt: new Date(booking.createdAt),
      }));
    } catch (error) {
      console.error('Error loading bookings:', error);
      return [];
    }
  }

  static getBookingsByUser(userId: string): Booking[] {
    return this.getAllBookings().filter(booking => booking.userId === userId);
  }

  static deleteBooking(bookingId: string): boolean {
    try {
      const bookings = this.getAllBookings();
      const filteredBookings = bookings.filter(booking => booking.id !== bookingId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredBookings));
      return true;
    } catch (error) {
      console.error('Error deleting booking:', error);
      return false;
    }
  }

  static clearAllBookings(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
