import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class OptOutInitiatedEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.OptOutInitiated;
}
