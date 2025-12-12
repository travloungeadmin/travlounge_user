export type Coords = {
  latitude: number;
  longitude: number;
};

export type Place = {
  name?: string | null;
  street?: string | null;
  city?: string | null;
  region?: string | null;
  subregion?: string | null;
  country?: string | null;
  postalCode?: string | null;
  district?: string | null;
  streetNumber?: string | null;
  isoCountryCode?: string | null;
  timezone?: string | null;
  [key: string]: any;
};

export type PermissionStatus = 'granted' | 'denied' | 'undetermined' | 'unavailable';
