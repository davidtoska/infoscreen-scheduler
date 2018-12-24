import moment from 'moment';
import CalendarEventReminders from './CalendarEventReminder';

type Repeat = 'Once' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

class CalendarEvent {
  public static sort(calendarEvents: CalendarEvent[]) {
    const unsorted = calendarEvents;
    unsorted.sort((a, b) => {
      if (moment(a.eventStart).isBefore(b.eventStart)) {
        return -1;
      }
      return 1;
    });
  }
  public name: string;
  public eventStart: string;
  // Optional parameters
  public repeat: Repeat;
  public messages?: CalendarEventReminders[];

  constructor(name: string, eventStart: string) {
    this.name = name;
    this.eventStart = eventStart;
    this.repeat = 'Once';
  }

  public getMessage(): string {
    return '';
  }
}

export default CalendarEvent;
