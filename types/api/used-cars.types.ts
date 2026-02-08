export interface AgentDetails {
  id: number;
  agency_name: string;
  contact_number: string;
  email: string;
  agent_type: string;
}

export interface UsedCarItem {
  id: number;
  agent: number;
  agent_details: AgentDetails;
  name: string;
  car_model: string | null;
  fuel: string;
  price: string;
  kms: number;
  license_plate: string;
  ownership: string;
  place: string;
  transmission: string;
  year_of_manufacture: number;
  images: string[];
  documents: string[];
  exterior_details: any[];
  features: string[];
  insurance: string | null;
  interior_details: any[];
  is_favourite: boolean;
  number_of_seats: number | null;
  packages: any[];
  rto: string | null;
  specifications: Record<string, string>;
  created_on: string;
  updated_on: string;
}

export interface GetUsedCarsResponse {
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
  results: UsedCarItem[];
}

export interface CarMake {
  make: string;
  count: number;
}

export interface MinMaxRange {
  min: number;
  max: number;
}

export interface CarFilterOptionsResponse {
  car_makes: CarMake[];
  colours: string[];
  fuel_types: string[];
  kms_range: MinMaxRange;
  ownership_types: string[];
  places: string[];
  price_range: MinMaxRange;
  seats: number[];
  transmission_types: Array<'Automatic' | 'Manual'> | string[];
  year_range: MinMaxRange;
}
