import {
  ActivityEventTypes,
  ActivityEventURIs,
} from '../enums/activity-events';
import { BaseEvent } from '../event-classes/BaseEvent';
import { SessionRecoveredEvent } from '../event-classes/activity/session-recovered';

export const activityEventMapping: Record<
  (typeof ActivityEventURIs)[ActivityEventTypes],
  BaseEvent
> = {
  [ActivityEventURIs[ActivityEventTypes.SessionRecovered]]:
    SessionRecoveredEvent,
};
