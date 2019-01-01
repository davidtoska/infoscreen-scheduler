import InfoScreenEvent from './InfoScreenEvent';

interface InfoScreenUser {
  name: string;
  dateOfBirth: Date;
  todayStartAtHour: number;
  tomorrowStartAtHour: number;
  events: InfoScreenEvent[];
}

const createInfoScreenUser = (
  name: string,
  dateOfBirth: Date,
  todayStartAtHour: number = 6,
  tomorrowStartAtHour: number = 18,
  events: InfoScreenEvent[] = [],
): InfoScreenUser => {
  return {
    name,
    dateOfBirth,
    todayStartAtHour,
    tomorrowStartAtHour,
    events,
  };
};

export { createInfoScreenUser };
export default InfoScreenUser;
