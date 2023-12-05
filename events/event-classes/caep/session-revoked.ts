import { CaepEventTypes } from '../../enums/caep-events';
import { BaseEvent } from '../BaseEvent';

export class SessionRevokedEvent extends BaseEvent {
  readonly eventType: CaepEventTypes = CaepEventTypes.SessionRevoked;
}
