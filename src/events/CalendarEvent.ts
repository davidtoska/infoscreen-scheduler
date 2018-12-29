import moment from 'moment';

type Repeat = 'Once' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

class CalendarEvent {
  public name: string;
  public startMoment: string;
  public endMoment: string;
  // Optional parameters
  public repeat: Repeat;
  public reminder: string;
  public todayStartAtHour: number;
  public tomorrowStartAtHour: number;
  public reminderOvertimeInMinutes: number;

  constructor(name: string, startMoment: string, endMoment = startMoment) {
    this.name = name;
    this.startMoment = startMoment;
    this.endMoment = endMoment;
    this.repeat = 'Once';
    this.reminder = '';
    this.todayStartAtHour = 6;
    this.tomorrowStartAtHour = 18;
    this.reminderOvertimeInMinutes = 60;
  }

  public getReminder(momentString = moment().format()): string {
    let reminder = '';

    if (!moment(momentString).isValid()) {
      throw new Error('Not a valid moment string');
    }

    const isDayBefore = moment(momentString)
      .add(23, 'hours')
      .isSame(this.startMoment, 'day');

    const isSameDay = moment(momentString).isSame(this.startMoment, 'day');

    const hour = moment(momentString).toArray()[3];
    const minutesAfterStart = moment(momentString).diff(this.startMoment, 'minutes');

    if (isDayBefore && hour >= this.tomorrowStartAtHour) {
      reminder = `${this.reminder} i morgen`;
    } else if (isSameDay && hour < this.todayStartAtHour) {
      reminder = `${this.reminder} i morgen`;
    } else if (isSameDay && hour >= this.todayStartAtHour && minutesAfterStart < this.reminderOvertimeInMinutes) {
      reminder = `${this.reminder} i dag`;
    } else {
      reminder = '';
    }
    return reminder;
  }
}

export default CalendarEvent;
