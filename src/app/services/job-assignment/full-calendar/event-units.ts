import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
var date = new Date();

// add a day
var newDate = date.setDate(date.getDate() + 2);
console.log(newDate)
var otherDate = new Date(newDate).toISOString().replace(/T.*$/, '');
export const INITIAL_EVENTS: EventInput[] = [
  // {
  //   id: createEventId(),
  //   title: 'All-day event',
  //   start: TODAY_STR
  // },
  // {
  //   id: createEventId(),
  //   title: 'Timed event',
  //   start: otherDate
  // },
  // {
  //   id: createEventId(),
  //   title: 'New Events',
  //   start: otherDate
  // }
];

export function createEventId() {
  return String(eventGuid++);
}
