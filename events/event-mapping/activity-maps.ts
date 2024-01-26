import {
  ActivityEventTypes,
  ActivityEventURIs,
} from '../enums/activity-events';
import { SessionRecoveredEvent } from '../event-classes/activity/session-recovered';
import { BaseEvent } from '../event-classes/base-event';
import { SETEvents } from '../types/ssf';
import { AllEventURIs } from '../enums/events';
import { EVENT_DETAILS_URI, EVENT_METADATA_URI, MOCK_DEVICE_ID, MOCK_LOCATION } from './event-mapping';

export const activityEventMapping: Record<string, any> = {
  [ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri] : SessionRecoveredEvent,
};

export const activityEventExampleMapping: Record<string, (id: string, curTimeAsLong: number) => SETEvents> = {
  [ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri] :
    (id: string, curTimeAsLong: number) => ({
      [ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri]: {
        subject: {
          format: 'uri',
          uri: id
        },
        session: {
          format : "opaque",
          id: 'xl64R1ZpElhTUf11Gz6Kj1FSMFdLimgiJKMyBzn8lMI'
        },
        previous_session_id: 'LUpQMy66HnL1SxCdqZuuujWgZiLcKiBOEhzJs8uXiAE',
        initiating_entity: 'system',
        reason_admin: {
          en: 'System initiated session recovery'
        },
        event_timestamp: curTimeAsLong
      },
      [EVENT_METADATA_URI]: {
        event_timestamp_ms: curTimeAsLong
      },
      [EVENT_DETAILS_URI + AllEventURIs[ActivityEventTypes.SessionRecovered].detailsKey + '/eventDetails'] : {
        device_id: MOCK_DEVICE_ID,
        location : MOCK_LOCATION
      }
    })
};

