import {
  ActivityEventTypes,
  ActivityEventURIs,
} from '../enums/activity-events';
import { SessionRecoveredEvent } from '../event-classes/activity/session-recovered';

export const activityEventMapping: Record<
  (typeof ActivityEventURIs)[ActivityEventTypes],
  any
> = {
  [ActivityEventURIs[ActivityEventTypes.SessionRecovered]]:
    SessionRecoveredEvent,
};
