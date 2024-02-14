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
  generateEventMetaDataAndDetails,
} from './event-mapping';

/*
  An activity is a type of fraud signal added by OneLogin to the SSF data model that corresponds to an account
  or session event that does not correspond to a signal in SSF.
 */

async function generateActivityUserSessionEvent(eventType: ActivityEventTypes, userId: string, sessionId: string,
                                              timestampType: TimestampTypes,
                                              startTime: number, endTime: number): Promise<SETEvents> {

  let metadataAndDetails = await generateEventMetaDataAndDetails(eventType, timestampType, startTime, endTime)

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

export const activityEventMapping: Record<string, any> = {
  [ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri] : SessionRecoveredEvent,
};

export const activityPopulatedEventMapping: Record<string, (id: string, timestampType: TimestampTypes,
  startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => Promise<SETEvents>> = {

  [ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri] :
    async (id: string, timestampType: TimestampTypes, startTimeAsLong: number, endTimeAsLong: number,
         ...args: (string | null) []) => {

      let metadataAndDetails = await generateActivityUserSessionEvent(ActivityEventTypes.SessionRecovered,
        id, args[0] ?? DEFAULT_SESSION_ID, timestampType, startTimeAsLong, endTimeAsLong)

      let event = metadataAndDetails[ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri]

      addStandardEventFields(event, startTimeAsLong, args[2] ?? DEFAULT_INITIATING_ENTITY,
        args[3] ?? DEFAULT_REASON_ADMIN, args[4] ?? DEFAULT_REASON_USER)

      event['previous_session_id'] = args[1] ?? DEFAULT_PREVIOUS_SESSION_ID;

      return metadataAndDetails
    }
};

