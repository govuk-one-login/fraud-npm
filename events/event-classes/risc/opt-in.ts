import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class OptInEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.OptIn;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.OptIn;
}
