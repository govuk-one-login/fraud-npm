import { TxmaEventNames } from '../../enums/event-names';
import { NotificationEventTypes } from '../../enums/notification-events';
import { BaseEvent } from '../BaseEvent';

export class AccountConcernEvent extends BaseEvent {
  readonly eventType: NotificationEventTypes =
    NotificationEventTypes.AccountConcern;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.AccountConcern;
}
