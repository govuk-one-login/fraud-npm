import {
  NotificationEventTypes,
  NotificationEventURIs,
} from '../enums/notification-events';
import { AccountConcernEvent } from '../event-classes/notification/account-concern';
import { DeviceConcernEvent } from '../event-classes/notification/device-concern';

export const notificationEventMapping: Record<
  (typeof NotificationEventURIs)[NotificationEventTypes],
  any
> = {
  [NotificationEventURIs[NotificationEventTypes.AccountConcern]]:
    AccountConcernEvent,
  [NotificationEventURIs[NotificationEventTypes.DeviceConcern]]:
    DeviceConcernEvent,
};
