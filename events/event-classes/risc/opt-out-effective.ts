import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class OptOutEffectiveEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.OptOutEffective;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.OptOutEffective;
}
