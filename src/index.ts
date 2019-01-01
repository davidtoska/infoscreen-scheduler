import InfoScreenEvent, { createInfoScreenEvent, getReminder } from './events/InfoScreenEvent';
import InfoScreenEventList from './events/InfoScreenEventList';
import InfoScreenUser, { createInfoScreenUser } from './events/InfoScreenUser';

const modelFactory = {
  createInfoScreenUser,
  createInfoScreenEvent,
};
const utils = {
  getReminder,
};

export { utils, InfoScreenEvent, InfoScreenUser, InfoScreenEventList };
export default modelFactory;
