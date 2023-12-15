import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class RecoveryActivatedEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.RecoveryActivated;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.RecoveryActivated;
}
