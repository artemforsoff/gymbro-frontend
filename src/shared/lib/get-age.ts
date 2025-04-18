import { differenceInYears, parseISO, isValid } from 'date-fns';

/**
 * Calculates age based on date of birth (string or ISO)
 * @param birthDate - string in ISO format, for example: "1999-04-18T00:00:00.000Z"
 */
export const getAge = (birthDate: string): number => {
  const parsedDate = parseISO(birthDate);
  if (!isValid(parsedDate)) return 0;

  return differenceInYears(new Date(), parsedDate);
};
