export interface PaymentSuccessResponse {
  message: string;
  data: {
    payment_id: string;
    amount: number;
    status: string;
    room_number?: string;
    event_details?: {
      id: string;
      user: string;
      service: number;
      listing: number;
      service_name?: string;
      serviceType_name?: string;
      status?: string;
      created_at?: string;
      updated_at?: string;
    };
  };
}

export interface TolooEventResponse {
  message: string;
  room_number: string;
}

export interface ServicePaymentResponse {
  razorpay_order_id: string;
  key?: string;
  amount?: number;
  currency?: string;
  name?: string;
  description?: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}
