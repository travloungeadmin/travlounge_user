export const isValidPhoneNumber = (phone: string): boolean => {
  // Match exactly 10 digits
  const phoneRegex = /^[6-9]\d{9}$/;

  // Basic validation rules for Indian phone numbers:
  // 1. Must be exactly 10 digits
  // 2. Must start with 6, 7, 8, or 9 (Indian mobile numbers)
  // 3. Should not contain any other characters
  return phoneRegex.test(phone);
};

export const getPhoneValidationError = (phone: string): string | null => {
  if (!phone) {
    return 'Almost there! Enter your phone number to proceed.';
  }

  if (phone.length !== 10) {
    return 'Phone number must be 10 digits';
  }

  if (!/^[0-9]+$/.test(phone)) {
    return 'Phone number should only contain digits';
  }

  if (!/^[6-9]/.test(phone)) {
    return 'Invalid phone number. Should start with 6, 7, 8, or 9';
  }

  return null;
};
