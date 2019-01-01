import moment from 'moment';
import { createInfoScreenEvent } from './InfoScreenEvent';
import InfoScreenEventList from './InfoScreenEventList';

// Init moment
moment.locale('nb');

const eventList: InfoScreenEventList = new InfoScreenEventList();

describe('Testing EventList', () => {
  beforeAll(() => {
    const initialElements = [
      createInfoScreenEvent('1feb', moment([2019, 2, 1, 0, 0]).toDate()),
      createInfoScreenEvent('1mai', moment([2019, 5, 1, 0, 0]).toDate()),
      createInfoScreenEvent('1jun', moment([2019, 6, 1, 0, 0]).toDate()),
      createInfoScreenEvent('1apr', moment([2019, 4, 1, 0, 0]).toDate()),
      createInfoScreenEvent('1mar', moment([2019, 3, 1, 0, 0]).toDate()),
      createInfoScreenEvent('1jan', moment([2019, 1, 1, 0, 0]).toDate()),
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
    eventList.add(createInfoScreenEvent('2feb', moment([2019, 2, 2, 9, 0]).toDate()));
    const nAfter = events.length;
    expect(nAfter - nBefore).toEqual(1);
  });

  test('A newly added element should be placed in sorted order', () => {
    eventList.add(createInfoScreenEvent('2feb', moment([2019, 2, 2, 9, 0]).toDate()));
    expect(eventList.events[2].name).toBe('2feb');
  });
});
