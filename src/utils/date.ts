import { format } from 'date-fns'

/**
 * Formats a date to a string using the ordinal date format.
 * @param date - The date to format.
 * @returns The formatted date string.
 * @example
 * ordinalDateFormatter(new Date('2024-01-01')) // 'January 1st, 2024'
 */
export default function ordinalDateFormatter(date: Date) {
  return format(date, 'PPP')
}
