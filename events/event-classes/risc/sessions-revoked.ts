import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class SessionsRevokedEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.SessionsRevoked;
}
