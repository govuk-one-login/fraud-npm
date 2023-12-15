import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class OptOutCancelledEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.OptOutCancelled;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.OptOutCancelled;
}
