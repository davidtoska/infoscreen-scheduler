import moment from 'moment';
import CalendarEvent from './CalendarEvent';
import CalendarEventList from './CalendarEventList';

// Init moment
moment.locale('nb');

const eventList: CalendarEventList = new CalendarEventList();

describe('Testing EventList', () => {
  beforeAll(() => {
    const initialElements = [
      new CalendarEvent('1jun', moment([2019, 6, 1, 0, 0]).format()),
      new CalendarEvent('1mai', moment([2019, 5, 1, 0, 0]).format()),
      new CalendarEvent('1apr', moment([2019, 4, 1, 0, 0]).format()),
      new CalendarEvent('1mar', moment([2019, 3, 1, 0, 0]).format()),
      new CalendarEvent('1jan', moment([2019, 1, 1, 0, 0]).format()),
      new CalendarEvent('1feb', moment([2019, 2, 1, 0, 0]).format()),
    ];
    eventList.events = initialElements;
  });

  test('A newly added eventList should be sorted', () => {
    const sorted = eventList.events;
    expect(sorted[0].name).toBe('1jan');
    expect(sorted[1].name).toBe('1feb');
    expect(sorted[2].name).toBe('1mar');
    expect(sorted[3].name).toBe('1apr');
    expect(sorted[4].name).toBe('1mai');
    expect(sorted[5].name).toBe('1jun');
  });

  test('The added eventList should have 6 elements', () => {
    const events = eventList.events;
    const nBefore = events.length;
    expect(nBefore).toEqual(6);
  });

  test('Adding a new event should increase number of elements', () => {
    const events = eventList.events;
    const nBefore = events.length;
    eventList.add(new CalendarEvent('2feb', moment([2019, 2, 2, 9, 0]).format()));
    const nAfter = events.length;
    expect(nAfter - nBefore).toEqual(1);
  });

  test('A newly added element should be placed in sorted order', () => {
    eventList.add(new CalendarEvent('2feb', moment([2019, 2, 2, 9, 0]).format()));
    expect(eventList.events[2].name).toBe('2feb');
  });
});
