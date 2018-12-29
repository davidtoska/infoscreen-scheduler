import moment from 'moment';
import { CalendarEvent } from '../index';
moment.locale('nb');

describe('CalendarEvent', () => {
  const startMoment = moment([2019, 0, 4, 9, 0]).format();
  const endMoment = moment(startMoment)
    .add(5, 'hours')
    .format();
  let event: CalendarEvent;
  const reminder = 'Svein skal utover';

  beforeAll(() => {
    event = new CalendarEvent('Lyngbøtunet', startMoment, endMoment);
    event.reminder = reminder;
  });

  test('Should have a name property', () => {
    expect(event.name).toBe('Lyngbøtunet');
  });

  test('Should have a startTime whitch is a moment', () => {
    expect(moment.isMoment(moment(event.startMoment))).toBe(true);
    expect(moment(event.startMoment).isValid()).toBe(true);
  });

  test('The event startMoment time should be correct', () => {
    expect(moment(event.startMoment).format('dddd')).toEqual('fredag');
    expect(moment(event.startMoment).format('D')).toEqual('4');
    expect(moment(event.startMoment).format('MMM')).toEqual('jan.');
    expect(moment(event.startMoment).format('YYYY')).toEqual('2019');
    expect(moment(event.startMoment).format('hh')).toEqual('09');
    expect(moment(event.startMoment).format('mm')).toEqual('00');
  });

  test('should remind about tomorrow 14 hours before.', () => {
    const before17h = moment(startMoment)
      .subtract(17, 'hours')
      .format();
    const before12h = moment(startMoment)
      .subtract(12, 'hours')
      .format();
    const before9h = moment(startMoment)
      .subtract(9, 'hours')
      .format();
    const before6h = moment(startMoment)
      .subtract(6, 'hours')
      .format();
    const before3h1m = moment(startMoment)
      .subtract(3, 'hours')
      .subtract(1, 'minutes')
      .format();
    const before2h59m = moment(startMoment)
      .subtract(2, 'hours')
      .subtract(59, 'minutes')
      .format();
    const before1h = moment(startMoment)
      .subtract(1, 'hours')
      .format();
    const ontime = moment(startMoment).format();
    const after59m = moment(startMoment)
      .add(59, 'minutes')
      .format();
    const after61m = moment(startMoment)
      .add(61, 'minutes')
      .format();

    expect(event.getReminder(before17h)).toEqual('');
    expect(event.getReminder(before12h)).toEqual(reminder + ' i morgen');
    expect(event.getReminder(before9h)).toEqual(reminder + ' i morgen');
    expect(event.getReminder(before6h)).toEqual(reminder + ' i morgen');
    expect(event.getReminder(before3h1m)).toEqual(reminder + ' i morgen');
    expect(event.getReminder(before2h59m)).toEqual(reminder + ' i dag');
    expect(event.getReminder(before1h)).toEqual(reminder + ' i dag');
    expect(event.getReminder(ontime)).toEqual(reminder + ' i dag');
    expect(event.getReminder(after59m)).toEqual(reminder + ' i dag');
    expect(event.getReminder(after61m)).toEqual('');
  });
});
