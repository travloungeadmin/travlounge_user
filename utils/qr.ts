export type RemainingTime = {
  value: number;
  unit: 'Days' | 'Months';
};

export function getRemainingTime(expiryDate?: string): RemainingTime {
  if (!expiryDate) {
    return { value: 0, unit: 'Days' };
  }
  const today = new Date();
  const expiry = new Date(expiryDate);

  // Normalize time (avoid time-of-day issues)
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffMs = expiry.getTime() - today.getTime();

  if (diffMs <= 0) {
    return { value: 0, unit: 'Days' };
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Calculate full months difference
  const months =
    (expiry.getFullYear() - today.getFullYear()) * 12 + (expiry.getMonth() - today.getMonth());

  if (months >= 1) {
    return { value: months, unit: 'Months' };
  }

  return { value: diffDays, unit: 'Days' };
}
