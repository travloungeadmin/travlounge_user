type RouteParams = {
  id: string;
  image: string;
  name: string;
  location: string;
  date: string;
  time: string;
  duration: number;
  status: 'success' | 'failed';
  wallet_balance?: string;
  required_amount?: string;
  message?: string;
  is_popup?: string;
  service_name?: string;
  service_type_name?: string;
  pay_now?: string;
  isPlans?: boolean;
}

export type PaymentResultParams = RouteParams;