import { NotificationEventTypes } from '../../enums/notification-events';
import { BaseEvent } from '../BaseEvent';

export class AccountConcernEvent extends BaseEvent {
  readonly eventType: NotificationEventTypes =
    NotificationEventTypes.AccountConcern;
}
