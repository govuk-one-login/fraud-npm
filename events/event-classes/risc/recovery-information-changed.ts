import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class RecoveryInformationChangedEvent extends BaseEvent {
  readonly eventType: RiscEventTypes =
    RiscEventTypes.RecoveryInformationChanged;
}
