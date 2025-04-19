import { DateTime } from 'luxon';

/**
 * Calculates age based on date of birth (string or ISO)
 * @param birthDate - string in ISO format, for example: "1999-04-18T00:00:00.000Z"
 */
export const getAge = (birthDate: string): number => {
  const date = DateTime.fromISO(birthDate, { zone: 'utc' });

  if (!date.isValid) return 0;

  return DateTime.utc().diff(date, 'years').years | 0;
};
