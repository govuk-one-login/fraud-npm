import {
  NotificationEventTypes,
  NotificationEventURIs,
} from '../enums/notification-events';
import { AccountConcernEvent } from '../event-classes/notification/account-concern';
import { DeviceConcernEvent } from '../event-classes/notification/device-concern';

export const notificationEventMapping: Record<string, any> = {
  [NotificationEventURIs[NotificationEventTypes.AccountConcern].uri]: AccountConcernEvent,
  [NotificationEventURIs[NotificationEventTypes.DeviceConcern].uri]: DeviceConcernEvent,
};
