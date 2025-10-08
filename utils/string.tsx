import { format, parse } from 'date-fns';

export function getRating(value: number): string {
  return `${value?.toFixed(1)}`;
}
export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    // Convert to kilometers and round to 1 decimal place if needed
    return `${(meters / 1000).toFixed(1)} km`;
  } else {
    // Keep the value in meters
    return `${meters.toFixed(0)} m`;
  }
}
// Converts time string to "h:mm am/pm" format
export const convertTimeTo12Hour = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date(0, 0, 0, hours, minutes); // Create a date object with time

  return format(date, 'h:mm a').toLowerCase(); // Converts to "h:mm am/pm"
};

// Converts date string to "dd-mm-yyyy" format
export const formatDateToDMY = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const revertFormattedDate = (formattedDate: string) => {
  return parse(formattedDate, 'yyyy-MM-dd', new Date());
};
export const convertTimeToISO = (time: string, date: string = '2025-02-25') => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

  parsedDate.setHours(hours, minutes, seconds, 0); // Set time separately

  return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // Convert to ISO format
};

/**
 * Converts an array of time ranges (e.g., ["09:00-17:00"]) to am/pm format (e.g., ["9am-5pm"]).
 * Handles invalid input gracefully and logs errors.
 */
export function convertRangeToAmPm(ranges: string[]): string[] {
  if (!Array.isArray(ranges)) {
    console.error('convertRangeToAmPm: Expected an array of strings.');
    return [];
  }
  return ranges.map((range) => {
    if (typeof range !== 'string' || !range.includes('-')) {
      console.error(`convertRangeToAmPm: Invalid range format: "${range}"`);
      return '';
    }
    const [start, end] = range.split('-');
    try {
      return `${formatToAmPm(start)}-${formatToAmPm(end)}`;
    } catch (error) {
      console.error(`convertRangeToAmPm: Error formatting range "${range}":`, error);
      return '';
    }
  });
}

/**
 * Converts a time string (e.g., "14:30") to 12-hour am/pm format (e.g., "2pm").
 * Throws an error for invalid input.
 */
function formatToAmPm(timeStr: string): string {
  if (typeof timeStr !== 'string' || !/^\d{1,2}:\d{2}$/.test(timeStr)) {
    throw new Error(`formatToAmPm: Invalid time string "${timeStr}"`);
  }
  const [hourStr] = timeStr.split(':');
  const hour = Number(hourStr);
  if (isNaN(hour) || hour < 0 || hour > 23) {
    throw new Error(`formatToAmPm: Invalid hour value in "${timeStr}"`);
  }
  const suffix = hour >= 12 ? 'pm' : 'am';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}${suffix}`;
}
