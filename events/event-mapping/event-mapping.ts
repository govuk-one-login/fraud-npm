import { AllEventTypes, AllEventURIs, TimestampTypes } from '../enums/events';
import { activityEventMapping } from './activity-maps';
import { caepEventMapping } from './caep-maps';
import { notificationEventMapping } from './notification-maps';
import { riscEventMapping } from './risc-maps';
import { SETEvents } from '../types/ssf';

export const EVENT_METADATA_URI= 'https://vocab.account.gov.uk/secevent/v1/eventMetadata'
export const EVENT_DETAILS_URI = 'https://vocab.account.gov.uk/secevent/v1/'

export const MOCK_DEVICE_ID = 'some-device-id'
export const DEFAULT_LOCATION = 'GB'

export const MOCK_URI = 'uri:fdc:gov.uk:2022:56P4CMsGh_02YOlWpd8PAOI-2sVlB2nsNU7mcLZYhYw='

export async function generateStandardUserSubjectEvent(eventType: AllEventTypes, id: string,
  timestampType: TimestampTypes, startTime: number, endTime: number,
  deviceId: string, location: string): Promise<SETEvents> {
  return {
    [AllEventURIs[eventType].uri]: {
      subject: {
        format: "uri",
        uri: id
      },
    },

    [EVENT_METADATA_URI]: {
      ...(timestampType === TimestampTypes.timeStamp
        ? ({ event_timestamp: 100 })
        : {
          event_timeframe_ms: {
            start_time: startTime,
            end_time: endTime
          },
        }),
    },

    [EVENT_DETAILS_URI + AllEventURIs[eventType].detailsKey + '/eventDetails'] : {
      //device_id: location,
      location : deviceId
    }
  }
};

export const eventMapping: Record<string, any> = {
  ...notificationEventMapping,
  ...riscEventMapping,
  ...activityEventMapping,
  ...caepEventMapping,
};
