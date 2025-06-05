import {
  NotificationEventTypes,
  NotificationEventURIs,
} from '../enums/notification-events';
import { AccountConcernEvent } from '../event-classes/notification/account-concern';
import { AllEventURIs, TimestampTypes } from '../enums/events';
import { EventStructure, SETEvents } from '../types/ssf';
import {
  DEFAULT_INITIATING_ENTITY,
  DEFAULT_RATIONALE_CODE,
  DEFAULT_REASON_ADMIN,
  generateMetaDataAndDetailsEvents,
  generateStandardUserSubjectEvents,
} from './events-mapping';
import { AccountBlockEvent } from '../event-classes/notification/account-block';

export const notificationEventsMapping: Record<string, any> = {
  [NotificationEventURIs[NotificationEventTypes.AccountConcern].uri]:
    AccountConcernEvent,
  [NotificationEventURIs[NotificationEventTypes.AccountBlock].uri]:
    AccountBlockEvent,
};

export function addStandardNotificationFields(
  event: EventStructure,
  startTimeInMillis: number,
  endTimeInMillis: number,
  initiatingEntity: string,
  reasonAdmin: string
) {
  let startTimeInSeconds = Math.round(startTimeInMillis / 1000);
  let endTimeInSeconds = Math.round(startTimeInMillis / 1000);

  let timeFrame: {};
  if (startTimeInMillis == 0 && endTimeInMillis != 0) {
    timeFrame = { end_time: endTimeInSeconds };
  } else if (startTimeInMillis !== 0 && endTimeInMillis == 0) {
    timeFrame = { start_time: endTimeInSeconds };
  } else {
    timeFrame = { start_time: startTimeInSeconds, end_time: endTimeInSeconds };
  }

  event['event_timeframe'] = timeFrame;
  event['initiating_entity'] = initiatingEntity;
  event['reason_admin'] = { en: reasonAdmin };
}

async function generateNotificationDeviceSubjectEvents(
  eventType: NotificationEventTypes,
  deviceId: string,
  timestampType: TimestampTypes,
  startTimeInMillis: number,
  endTimeInMillis: number
): Promise<SETEvents> {
  let metadataAndDetails = await generateMetaDataAndDetailsEvents(
    eventType,
    timestampType,
    startTimeInMillis,
    endTimeInMillis
  );

  return {
    [AllEventURIs[eventType].uri]: {
      subject: {
        device: {
          format: 'opaque',
          id: deviceId,
        },
      },
    },
    ...metadataAndDetails,
  };
}

export const notificationPopulatedEventsMapping: Record<
  string,
  (
    id: string,
    startTimeInMillis: number,
    endTimeInMillis: number,
    ...args: (string | null)[]
  ) => Promise<SETEvents>
> = {
  [NotificationEventURIs[NotificationEventTypes.AccountConcern].uri]: async (
    id: string,
    startTimeInMillis: number,
    endTimeInMillis: number,
    ...args: (string | null)[]
  ) => {
    let events = await generateStandardUserSubjectEvents(
      NotificationEventTypes.AccountConcern,
      id,
      TimestampTypes.timeFrame,
      startTimeInMillis,
      endTimeInMillis
    );

    let event =
      events[NotificationEventURIs[NotificationEventTypes.AccountConcern].uri];

    event['rationale'] = { code: args[0] ?? DEFAULT_RATIONALE_CODE };

    addStandardNotificationFields(
      event,
      startTimeInMillis,
      endTimeInMillis,
      args[1] ?? DEFAULT_INITIATING_ENTITY,
      args[2] ?? DEFAULT_REASON_ADMIN
    );

    return events;
  },

  [NotificationEventURIs[NotificationEventTypes.AccountBlock].uri]: async (
    id: string,
    startTimeInMillis: number,
    endTimeInMillis: number,
    ...args: (string | null)[]
  ) => {
    let events = await generateStandardUserSubjectEvents(
      NotificationEventTypes.AccountBlock,
      id,
      TimestampTypes.timeFrame,
      startTimeInMillis,
      endTimeInMillis
    );

    let event =
      events[NotificationEventURIs[NotificationEventTypes.AccountBlock].uri];

    addStandardNotificationFields(
      event,
      startTimeInMillis,
      endTimeInMillis,
      args[0] ?? DEFAULT_INITIATING_ENTITY,
      args[1] ?? DEFAULT_REASON_ADMIN
    );

    return events;
  },
};
