import {
  ActivityEventTypes,
  ActivityEventURIs,
} from '../enums/activity-events';
import { SessionRecoveredEvent } from '../event-classes/activity/session-recovered';
import { BaseEvent } from '../event-classes/base-event';
import { SETEvents } from '../types/ssf';
import { AllEventURIs, TimestampTypes } from '../enums/events';
import { EVENT_DETAILS_URI, EVENT_METADATA_URI, MOCK_DEVICE_ID, DEFAULT_LOCATION } from './event-mapping';

/*
  An activity is a type of fraud signal added by OneLogin to the SSF data model that corresponds to an account
  or session event that does not correspond to a signal in SSF.
 */

export const activityEventMapping: Record<string, any> = {
  [ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri] : SessionRecoveredEvent,
};

export const activityPopulatedEventMapping: Record<string, (id: string, timestampType: TimestampTypes,
  startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => Promise<SETEvents>> = {

  [ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri] :
    async (id: string, timestampType: TimestampTypes, startTimeAsLong: number, endTimeAsLong: number,
         ...args: string[]) => ({
      [ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri]: {
        subject: {
          format: 'uri',
          uri: id
        },
        session: {
          format : "opaque",
          id: args[0]
        },
        previous_session_id: args[1],
        initiating_entity: args[2],
        reason_admin: {
          en: args[3]
        },
        event_timestamp: startTimeAsLong
      },
      [EVENT_METADATA_URI]: {
        ...(timestampType === TimestampTypes.timeStamp
          ? ({ event_timestamp: 100 })
          : {
            event_timeframe_ms: {
              start_time: startTimeAsLong,
              end_time: endTimeAsLong
            },
          }),
      },
      [EVENT_DETAILS_URI + AllEventURIs[ActivityEventTypes.SessionRecovered].detailsKey + '/eventDetails'] : {
        device_id: MOCK_DEVICE_ID,
        location : DEFAULT_LOCATION
      }
    })
};

