import { TxmaEventNames } from '../../enums/event-names';
import { NotificationEventTypes } from '../../enums/notification-events';
import { BaseEvent } from '../BaseEvent';

export class DeviceConcernEvent extends BaseEvent {
  readonly eventType: NotificationEventTypes =
    NotificationEventTypes.DeviceConcern;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.DeviceConcern;
}
