// Car wash services API types
export interface CarWashServiceRequest {
  listing_id: string | number;
  car_id: string | number;
}

export interface CarWashService {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  image?: string;
  features: string[];
  is_available: boolean;
}

export interface CarWashServicesResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    listing: number;
    name: string;
    category_detail: {
      id: number;
      name: string;
    };
    car_detail: {
      id: number;
      name: string;
    };
    price: string;
    duration: number;
    description: string;
    status: string;
    images: string[];
  }[];
  listing_info: {
    id: number;
    name: string;
    location: string;
    rating: number;
    contact: string;
  };
  car_info: {
    id: number;
    type: string;
    description: string;
    seats: number;
    base_price: number;
  };
}

// Car wash time slots API types
export interface CarWashTimeSlotsRequest {
  date: string;
  listing_id: string | number; // Listing ID for the car wash service
}

export interface CarWashTimeSlot {
  id: number;
  time: string; // e.g., "09:00" or "14:30"
  is_available: boolean;
  booking_count: number;
  max_capacity: number;
  service_duration: number; // in minutes
}

export interface CarWashTimeSlotsResponse {
  success: boolean;
  message: string;
  data: string[];
}

// Car wash booking API types
export interface CarWashBookingRequest {
  listing_id: string | number; //
  car_id: string | number; //
  vehicle_number: string; //
  service_id: string | number; //
  time: string | number; //
  date: string; //
  amount: number; //
  final_amount: number; //
  travlounge_percentage: number; //
}
export interface CarWashBookingVerifyRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface CarWashBooking {
  id: number;
  booking_id: string;
  listing_id: number;
  car_id: number;
  service_id: number;
  time_slot_id: number;
  date: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  special_instructions?: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface CarWashBookingResponse {
  success: boolean;
  message: string;
  data: {
    booking: CarWashBooking;
    payment_url?: string;
    estimated_completion_time: string;
  };
}
