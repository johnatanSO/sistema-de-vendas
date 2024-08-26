export interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number
  compareInDays(startDate: Date, endDate: Date): number
  convertToUTC(date: Date): string
  dateNow(): Date
  endDay(date: Date): Date
  addDays(days: number): Date
  addHours(hours: number): Date
  compareBefore(startDate: Date, endDate: Date): boolean
}
