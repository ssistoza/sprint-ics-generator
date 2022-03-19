export function isLeapYear(year: number) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

export function getDaysOfAYear(year: number) {
  return isLeapYear(year) ? 366 : 365;
}

export function getTotalDaysThisYear() {
  const today = new Date();

  return getDaysOfAYear(today.getFullYear());
}

export function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const TOTAL_DAYS_THIS_YEAR = getTotalDaysThisYear();
export const LAST_DAY_OF_YEAR = new Date(new Date().getFullYear(), 11, 31);
