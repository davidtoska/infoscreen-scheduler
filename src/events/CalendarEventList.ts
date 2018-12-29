import moment from 'moment';
import CalendarEvent from './CalendarEvent';

class CalendarEventList {
  private _events: CalendarEvent[];

  constructor() {
    this._events = [];
  }

  public add(calendarEvent: CalendarEvent) {
    this._events.push(calendarEvent);
    this.sort(this._events);
  }

  private sort(events: CalendarEvent[]): CalendarEvent[] {
    const sorted = events.sort((a, b) => {
      if (moment(a.startMoment).isBefore(b.startMoment)) {
        return -1;
      }
      return 1;
    });
    return sorted;
  }

  get events(): CalendarEvent[] {
    return this._events;
  }

  set events(value: CalendarEvent[]) {
    const sorted = this.sort(value);
    this._events = sorted;
  }
}

export default CalendarEventList;