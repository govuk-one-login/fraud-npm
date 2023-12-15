import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class IdentifierRecycledEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.IdentifierRecycled;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.IdentifierRecycled;
}
