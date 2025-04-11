import { format } from 'date-fns';

export function numbersToMonths(monthNumbers:Array<number>, formatStr = 'MMM') {
  return monthNumbers.map(monthNum => {
    // Create a date object (year and day don't matter here)
    const date = new Date(2000, monthNum - 1, 1);
    return format(date, formatStr);
  });
}
