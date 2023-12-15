import {
  NotificationEventTypes,
  NotificationEventURIs,
} from '../enums/notification-events';
import { BaseEvent } from '../event-classes/BaseEvent';
import { AccountConcernEvent } from '../event-classes/notification/account-concern';
import { DeviceConcernEvent } from '../event-classes/notification/device-concern';

export const notificationEventMapping: Record<
  (typeof NotificationEventURIs)[NotificationEventTypes],
  typeof BaseEvent
> = {
  [NotificationEventURIs[NotificationEventTypes.AccountConcern]]:
    AccountConcernEvent,
  [NotificationEventURIs[NotificationEventTypes.DeviceConcern]]:
    DeviceConcernEvent,
};
