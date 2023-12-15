import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class IdentifierChangedEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.IdentifierChanged;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.IdentifierChanged;
}
