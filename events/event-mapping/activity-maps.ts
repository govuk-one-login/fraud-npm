import { ActivityEventTypes, ActivityEventURIs } from '../enums/activity-events';
import { SessionRecoveredEvent } from '../event-classes/activity/session-recovered';
import { SETEvents } from '../types/ssf';
import { AllEventURIs, TimestampTypes } from '../enums/events';
import {
  addStandardEventFields,
  DEFAULT_INITIATING_ENTITY,
  DEFAULT_PREVIOUS_SESSION_ID,
  DEFAULT_REASON_ADMIN,
  DEFAULT_REASON_USER,
  DEFAULT_SESSION_ID,
  generateMetaDataAndDetailsEvents,
} from './events-mapping';

async function generateActivityUserSessionEvents(eventType: ActivityEventTypes, userId: string, sessionId: string,
                                              timestampType: TimestampTypes,
                                              startTimeInMillis: number, endTimeInMillis: number): Promise<SETEvents> {

  let metadataAndDetails = await generateMetaDataAndDetailsEvents(eventType, timestampType,
        startTimeInMillis, endTimeInMillis)

  return {
    ...metadataAndDetails,

    [AllEventURIs[eventType].uri]: {
      subject: {
        format: 'uri',
        uri: userId
      },
      session: {
        format : "opaque",
        id: sessionId
      },
    }
  }
}

export const activityEventsMapping: Record<string, any> = {
  [ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri] : SessionRecoveredEvent,
};

export const activityPopulatedEventsMapping: Record<string, (id: string,
  startTimeInMillis: number, endTimeInMillis: number, ...args: (string | null) []) => Promise<SETEvents>> = {

  [ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri] :
    async (id: string, startTimeAsLong: number, endTimeAsLong: number,
         ...args: (string | null) []) => {

      let events = await generateActivityUserSessionEvents(ActivityEventTypes.SessionRecovered,
        id, args[0] ?? DEFAULT_SESSION_ID, TimestampTypes.timeFrame, startTimeAsLong, endTimeAsLong)

      let event = events[ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri]

      addStandardEventFields(event, startTimeAsLong, args[2] ?? DEFAULT_INITIATING_ENTITY,
        args[3] ?? DEFAULT_REASON_ADMIN, args[4] ?? DEFAULT_REASON_USER)

      event['previous_session_id'] = args[1] ?? DEFAULT_PREVIOUS_SESSION_ID;

      return events
    }
};

