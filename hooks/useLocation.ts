import { LocationContext } from '@/context/location';
import React from 'react';

export const useLocation = () => {
  const context = React.useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
