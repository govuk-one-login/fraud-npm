import { NotificationEventTypes, NotificationEventURIs } from '../enums/notification-events';
import { AccountConcernEvent } from '../event-classes/notification/account-concern';
import { DeviceConcernEvent } from '../event-classes/notification/device-concern';
import { AllEventURIs, TimestampTypes } from '../enums/events';
import { EventStructure, SETEvents } from '../types/ssf';
import { ActivityEventTypes, ActivityEventURIs } from '../enums/activity-events';
import {
  addStandardEventFields,
  DEFAULT_INITIATING_ENTITY, DEFAULT_PREVIOUS_SESSION_ID, DEFAULT_RATIONALE_CODE,
  DEFAULT_REASON_ADMIN, DEFAULT_REASON_USER,
  DEFAULT_SESSION_ID, generateEventMetaDataAndDetails, generateStandardUserSubjectEvent,
} from './event-mapping';
import { AccountBlockEvent } from '../event-classes/notification/account-block';
import { CaepEventTypes } from '../enums/caep-events';

export const notificationEventMapping: Record<string, any> = {
  [NotificationEventURIs[NotificationEventTypes.AccountConcern].uri]: AccountConcernEvent,
  [NotificationEventURIs[NotificationEventTypes.AccountBlock].uri]: AccountBlockEvent,
  [NotificationEventURIs[NotificationEventTypes.DeviceConcern].uri]: DeviceConcernEvent,
};
export function addStandardNotificationFields(event: EventStructure,
    startTimeInSeconds: number, endTimeInSeconds: number, initiatingEntity: string, reasonAdmin:string) {
  event ['event_timeframe'] = { start_time: startTimeInSeconds / 1000, end_time: endTimeInSeconds / 1000 }
  event ['initiating_entity'] = initiatingEntity
  event ['reason_admin'] = { en: reasonAdmin }
}
async function generateNotificationDeviceSubjectEvent(eventType: NotificationEventTypes, deviceId: string,
    timestampType: TimestampTypes, startTime: number, endTime: number): Promise<SETEvents> {

  let metadataAndDetails = await generateEventMetaDataAndDetails(eventType, timestampType, startTime, endTime)

  return {
    ...metadataAndDetails,

    [AllEventURIs[eventType].uri]: {
      subject: {
        device: {
          format: 'opaque',
          id: deviceId,
        }
      }
    }
  }
}

export const notificationPopulatedEventMapping: Record<string, (id: string, timestampType: TimestampTypes,
      startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => Promise<SETEvents>> = {

  [NotificationEventURIs[NotificationEventTypes.AccountConcern].uri] :
    async (id: string, timestampType: TimestampTypes, startTimeAsLong: number, endTimeAsLong: number,
           ...args: (string | null) []) => {

      let metadataAndDetails = await generateStandardUserSubjectEvent(NotificationEventTypes.AccountConcern,
        id,  timestampType, startTimeAsLong, endTimeAsLong)

      let event = metadataAndDetails[NotificationEventURIs[NotificationEventTypes.AccountConcern].uri]

      event ['rationale'] = { code: args[0] ?? DEFAULT_RATIONALE_CODE }
      addStandardNotificationFields(event, startTimeAsLong / 1000, endTimeAsLong / 1000,
        args[1] ?? DEFAULT_INITIATING_ENTITY, args[2] ?? DEFAULT_REASON_ADMIN )

      return metadataAndDetails
    },

  [NotificationEventURIs[NotificationEventTypes.AccountBlock].uri] :
    async (id: string, timestampType: TimestampTypes, startTimeAsLong: number, endTimeAsLong: number,
           ...args: (string | null) []) => {

      let metadataAndDetails = await generateStandardUserSubjectEvent(NotificationEventTypes.AccountBlock,
        id,  timestampType, startTimeAsLong, endTimeAsLong)

      let event = metadataAndDetails[NotificationEventURIs[NotificationEventTypes.AccountBlock].uri]

      event ['reason_admin'] = args[0] ?? DEFAULT_REASON_ADMIN

      return metadataAndDetails
    },

  [NotificationEventURIs[NotificationEventTypes.DeviceConcern].uri] :
    async (id: string, timestampType: TimestampTypes, startTimeAsLong: number, endTimeAsLong: number,
           ...args: (string | null) []) => {

      let metadataAndDetails = await generateNotificationDeviceSubjectEvent(NotificationEventTypes.DeviceConcern,
        id, timestampType, startTimeAsLong, endTimeAsLong)

      let event = metadataAndDetails[NotificationEventURIs[NotificationEventTypes.DeviceConcern].uri]

      event ['rationale'] = { code: args[0] ?? DEFAULT_RATIONALE_CODE }
      addStandardNotificationFields(event, startTimeAsLong / 1000, endTimeAsLong / 1000,
        args[1] ?? DEFAULT_INITIATING_ENTITY, args[2] ?? DEFAULT_REASON_ADMIN )

      return metadataAndDetails
    },
};
