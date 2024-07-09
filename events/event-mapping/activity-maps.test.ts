import { activityPopulatedEventsMapping } from './activity-maps';
import {
  ActivityEventTypes,
  ActivityEventURIs,
} from '../enums/activity-events';
import { SETEvents } from '../types/ssf';
import * as sessionRecoveredEventSchema from '../schemas/activity/session-recovered.json';

import { DEFAULT_URI } from './events-mapping';
import { TimestampTypes } from '../enums/events';
import { validateSetEvents } from './event-mapping.test';

const SESSION_ID = 'xl64R1ZpElhTUf11Gz6Kj1FSMFdLimgiJKMyBzn8lMI';
const PREV_SESSION_ID = 'LUpQMy66HnL1SxCdqZuuujWgZiLcKiBOEhzJs8uXiAE';
const INITIATING_ENTITY = 'System initiated session recovery';
const ADMIN_REASON = 'Something went wrong';
const USER_REASON = 'Something went wrong';

describe('generate functions', () => {
  it('check populated events conforms to schemas', async () => {
    const uri = ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri;
    const subjectFn = activityPopulatedEventsMapping[uri];

    const set: SETEvents = await subjectFn(
      DEFAULT_URI,
      1000,
      0,
      SESSION_ID,
      PREV_SESSION_ID,
      INITIATING_ENTITY,
      ADMIN_REASON,
      USER_REASON
    );

    await validateSetEvents(
      set,
      ActivityEventTypes.SessionRecovered,
      sessionRecoveredEventSchema
    );
  });
});
