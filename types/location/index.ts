export interface LocationPermissionState {
  status: 'unavailable' | 'denied' | 'granted' | 'requesting';
  error?: string;
}

export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error?: string;
  loading: boolean;
}

export interface LocationError {
  code: string;
  message: string;
}

export interface LocationService {
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<{ latitude: number; longitude: number } | null>;
  checkPermissionStatus: () => Promise<'unavailable' | 'denied' | 'granted'>;
}
