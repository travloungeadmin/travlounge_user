export interface CarwashBookingData {
  booking_status: string;
  booking_time: string;
  cancellable: boolean;
  car_type: string;
  created_on: string;
  date: string;
  id: number;
  images: string[];
  items: any[];
  listing_name: string;
  payment_status: string;
  quantity: number;
  service_name: string;
  service_type_name: string;
  type: string;
  vehicle_number: string;
}

export interface CarwashTopCardProps {
  id: number;
  image: string;
  name: string;
  serviceType: string;
  quantity: number;
  vehicleNumber: string;
  carType: string;
}

export interface BillingDetailsProps {
  items: any[];
  total?: number;
}

export interface StatusCardProps {
  paymentStatus: string;
  bookingStatus: string;
}

export interface TimeSlotCardProps {
  bookingTime: string;
  serviceDate: string;
}

export interface CancellationTermsProps {
  isLoading: boolean;
  onPressCancel: () => void;
  cancellable: boolean;
}

export interface CancelledOnCardProps {
  canceledAt: string;
}
