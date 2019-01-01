import moment from 'moment';
import InfoScreenUser from './InfoScreenUser';

/**
 *
 */
export default interface InfoScreenEvent {
  name: string;
  start: Date;
  end: Date;
  reminder: string;
  overtimeInMin: number;
}

export const createInfoScreenEvent = (
  name: string,
  start: Date,
  end: Date = start,
  reminder: string = '',
  overtimeInMin: number = 10,
): InfoScreenEvent => {
  return {
    name,
    start,
    end,
    reminder,
    overtimeInMin,
  };
};

export const getReminder = (event: InfoScreenEvent, user: InfoScreenUser, now: Date = new Date()): string => {
  const nowMoment = moment(now).format();
  const startMoment = moment(event.start).format();
  let reminder = '';

  if (!moment(nowMoment).isValid()) {
    throw new Error('Not a valid moment string');
  }
  if (!moment(startMoment).isValid()) {
    throw new Error('Not a valid moment string');
  }

  const isDayBefore = moment(nowMoment)
    .add(23, 'hours')
    .isSame(startMoment, 'day');

  const isSameDay = moment(nowMoment).isSame(startMoment, 'day');
  const hour = moment(nowMoment).toArray()[3];
  const minutesAfterStart = moment(nowMoment).diff(startMoment, 'minutes');
  if (isDayBefore && hour >= user.tomorrowStartAtHour) {
    reminder = `${event.reminder} i morgen`;
  } else if (isSameDay && hour < user.todayStartAtHour) {
    reminder = `${event.reminder} i morgen`;
  } else if (isSameDay && hour >= user.todayStartAtHour && minutesAfterStart < event.overtimeInMin) {
    reminder = `${event.reminder} i dag`;
  } else {
    reminder = '';
  }
  return reminder;
};
