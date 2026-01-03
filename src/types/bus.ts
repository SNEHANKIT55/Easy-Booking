export interface Bus {
  id: string;
  operator: string;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  totalReviews: number;
  seatsAvailable: number;
  amenities: string[];
  boardingPoints: string[];
  droppingPoints: string[];
}

export interface Seat {
  id: string;
  number: string;
  type: "seater" | "sleeper";
  deck: "lower" | "upper";
  position: { row: number; col: number };
  price: number;
  status: "available" | "booked" | "selected" | "ladies";
}

export interface Booking {
  id: string;
  busId: string;
  userId: string;
  seats: string[];
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  boardingPoint: string;
  droppingPoint: string;
  travelDate: string;
  passengerDetails: PassengerDetail[];
  createdAt: string;
}

export interface PassengerDetail {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  seatNumber: string;
}
