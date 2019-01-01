import moment from 'moment';
import InfoScreenEvent from './InfoScreenEvent';

class InfoScreenEventList {
  private _events: InfoScreenEvent[];

  constructor() {
    this._events = [];
  }

  public add(event: InfoScreenEvent) {
    this._events.push(event);
    this.sort(this._events);
  }

  private sort(events: InfoScreenEvent[]): InfoScreenEvent[] {
    const sorted = events.sort((a, b) => {
      if (moment(a.start).isBefore(b.start)) {
        return -1;
      }
      return 1;
    });
    return sorted;
  }

  get events(): InfoScreenEvent[] {
    return this._events;
  }

  set events(value: InfoScreenEvent[]) {
    const sorted = this.sort(value);
    this._events = sorted;
  }
}

export default InfoScreenEventList;
