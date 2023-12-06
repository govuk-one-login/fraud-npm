import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class OptInEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.OptIn;
}
