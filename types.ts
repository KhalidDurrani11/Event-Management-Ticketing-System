
export interface Event {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  location: string;
  date: string;
  time: string;
  price: number;
  category: string;
  image: string;
  organizer: string;
  availableSeats: number;
}

export interface Booking {
  id: string;
  eventId: number;
  userId: string; // Clerk User ID
  qrCode: string; // URL or data for QR code
  createdAt: Date;
}

export interface Attendee {
    id: string;
    eventId: number;
    userId: string;
    userName: string;
    status: 'checked-in' | 'pending';
}

export type Category = 'All' | 'Music' | 'Tech' | 'Sports' | 'Art';
