class CalendarEventReminder {
  public startMinutesBefore: number;
  public durationInMinutes: number;
  public message: string;

  constructor(message: string, startMinutesBefore: number, durationInMinutes: number) {
    this.startMinutesBefore = startMinutesBefore;
    this.durationInMinutes = durationInMinutes;
    this.message = message;
  }
}

export default CalendarEventReminder;
