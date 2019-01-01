import moment from 'moment';
import InfoScreenEvent, { createInfoScreenEvent, getReminder } from './InfoScreenEvent';
import InfoScreenUser, { createInfoScreenUser } from './InfoScreenUser';

moment.locale('nb');

describe('CalendarEvent', () => {
  const startMoment = moment([2019, 0, 4, 9, 0]).toDate();
  const endMoment = moment(startMoment)
    .add(5, 'hours')
    .toDate();
  let event: InfoScreenEvent;
  const reminder = 'Svein skal utover';
  let user: InfoScreenUser;
  beforeAll(() => {
    event = createInfoScreenEvent('Lyngbøtunet', startMoment, endMoment);
    event.reminder = reminder;
    event.overtimeInMin = 60;
    user = createInfoScreenUser('Svein', moment([1925, 6, 27]).toDate());
  });

  test('Should have a name property', () => {
    expect(event.name).toBe('Lyngbøtunet');
  });

  test('Should have a startTime whitch is a moment', () => {
    expect(moment.isMoment(moment(event.start))).toBe(true);
    expect(moment(event.start).isValid()).toBe(true);
  });

  test('The event startMoment time should be correct', () => {
    expect(moment(event.start).format('dddd')).toEqual('fredag');
    expect(moment(event.start).format('D')).toEqual('4');
    expect(moment(event.start).format('MMM')).toEqual('jan.');
    expect(moment(event.start).format('YYYY')).toEqual('2019');
    expect(moment(event.start).format('hh')).toEqual('09');
    expect(moment(event.start).format('mm')).toEqual('00');
  });

  test('should remind about tomorrow 14 hours before.', () => {
    const before17h = moment(startMoment)
      .subtract(17, 'hours')
      .toDate();
    const before12h = moment(startMoment)
      .subtract(12, 'hours')
      .toDate();
    const before9h = moment(startMoment)
      .subtract(9, 'hours')
      .toDate();
    const before6h = moment(startMoment)
      .subtract(6, 'hours')
      .toDate();
    const before3h1m = moment(startMoment)
      .subtract(3, 'hours')
      .subtract(1, 'minutes')
      .toDate();
    const before2h59m = moment(startMoment)
      .subtract(2, 'hours')
      .subtract(59, 'minutes')
      .toDate();
    const before1h = moment(startMoment)
      .subtract(1, 'hours')
      .toDate();
    const ontime = moment(startMoment).toDate();
    const after59m = moment(startMoment)
      .add(59, 'minutes')
      .toDate();
    const after61m = moment(startMoment)
      .add(61, 'minutes')
      .toDate();

    expect(getReminder(event, user, before17h)).toEqual('');
    expect(getReminder(event, user, before12h)).toEqual(reminder + ' i morgen');
    expect(getReminder(event, user, before9h)).toEqual(reminder + ' i morgen');
    expect(getReminder(event, user, before6h)).toEqual(reminder + ' i morgen');
    expect(getReminder(event, user, before3h1m)).toEqual(reminder + ' i morgen');
    expect(getReminder(event, user, before2h59m)).toEqual(reminder + ' i dag');
    expect(getReminder(event, user, before1h)).toEqual(reminder + ' i dag');
    expect(getReminder(event, user, ontime)).toEqual(reminder + ' i dag');
    expect(getReminder(event, user, after59m)).toEqual(reminder + ' i dag');
    expect(getReminder(event, user, after61m)).toEqual('');
  });
});
