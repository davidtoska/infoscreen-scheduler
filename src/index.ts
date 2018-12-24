import moment from 'moment';
import 'moment/locale/nb';
import CalendarEvent from './CalendarEvent';
import CalendarEventReminder from './CalendarEventReminder';

const messages: CalendarEventReminder[] = [
  new CalendarEventReminder(
    'I morgen skal Svein utover',
    720,
    540),
  new CalendarEventReminder(
    'I dag skal Svein utover',
    180,
    220),
];


const dagsenter1 = new CalendarEvent(
  'dagsenter',
  moment([2019, 0, 2, 9, 0, 0]).format(),
);

console.log(moment(dagsenter1.eventStart).format("YYYY DD dddd HH mm ss"));

export const Greeter = (name: string) => `Hello ${name}`;
