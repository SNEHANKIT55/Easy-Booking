// Ticket storage utility functions using localStorage

export interface TicketData {
  id: string;
  bookingId: string;
  passengerName: string;
  passengerAge: number;
  passengerGender: string;
  seatNumber: string;
  busOperator: string;
  busType: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  boardingPoint: string;
  droppingPoint: string;
  amount: number;
  contactEmail: string;
  contactPhone: string;
  bookingDate: string;
  status: "upcoming" | "completed" | "cancelled";
}

const TICKETS_KEY = "redbus_tickets";

// Get all tickets
export const getAllTickets = (): TicketData[] => {
  const tickets = localStorage.getItem(TICKETS_KEY);
  return tickets ? JSON.parse(tickets) : [];
};

// Get tickets for a specific user (by email)
export const getUserTickets = (email: string): TicketData[] => {
  const tickets = getAllTickets();
  return tickets.filter((t) => t.contactEmail.toLowerCase() === email.toLowerCase());
};

// Save a new ticket
export const saveTicket = (ticket: Omit<TicketData, "id">): TicketData => {
  const tickets = getAllTickets();
  const newTicket: TicketData = {
    ...ticket,
    id: `TKT${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
  };
  tickets.push(newTicket);
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  return newTicket;
};

// Save multiple tickets (for multi-passenger bookings)
export const saveTickets = (ticketsData: Omit<TicketData, "id">[]): TicketData[] => {
  const tickets = getAllTickets();
  const newTickets: TicketData[] = ticketsData.map((ticket, index) => ({
    ...ticket,
    id: `TKT${Date.now()}${index}${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
  }));
  tickets.push(...newTickets);
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  return newTickets;
};

// Get ticket by ID
export const getTicketById = (id: string): TicketData | undefined => {
  const tickets = getAllTickets();
  return tickets.find((t) => t.id === id);
};

// Get ticket by booking ID
export const getTicketsByBookingId = (bookingId: string): TicketData[] => {
  const tickets = getAllTickets();
  return tickets.filter((t) => t.bookingId === bookingId);
};

// Update ticket status
export const updateTicketStatus = (
  id: string,
  status: TicketData["status"]
): TicketData | undefined => {
  const tickets = getAllTickets();
  const index = tickets.findIndex((t) => t.id === id);
  if (index === -1) return undefined;

  tickets[index].status = status;
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  return tickets[index];
};

// Get upcoming tickets
export const getUpcomingTickets = (email?: string): TicketData[] => {
  const tickets = email ? getUserTickets(email) : getAllTickets();
  return tickets.filter((t) => t.status === "upcoming");
};

// Get past tickets
export const getPastTickets = (email?: string): TicketData[] => {
  const tickets = email ? getUserTickets(email) : getAllTickets();
  return tickets.filter((t) => t.status === "completed" || t.status === "cancelled");
};

// Generate booking ID
export const generateBookingId = (): string => {
  return `RB${Date.now().toString().slice(-8)}`;
};

// Clear all tickets (for testing)
export const clearAllTickets = (): void => {
  localStorage.removeItem(TICKETS_KEY);
};
