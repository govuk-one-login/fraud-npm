import { ActivityEventTypes } from '../../enums/activity-events';
import { TxmaEventNames } from '../../enums/event-names';
import { BaseEvent } from '../BaseEvent';

export class SessionRecoveredEvent extends BaseEvent {
  readonly eventType: ActivityEventTypes = ActivityEventTypes.SessionRecovered;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.SessionRecovered;
}
