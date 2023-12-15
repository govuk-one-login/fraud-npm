import { CaepEventTypes } from '../../enums/caep-events';
import { TxmaEventNames } from '../../enums/event-names';
import { BaseEvent } from '../BaseEvent';

export class SessionRevokedEvent extends BaseEvent {
  readonly eventType: CaepEventTypes = CaepEventTypes.SessionRevoked;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.SessionRevoked;
}
