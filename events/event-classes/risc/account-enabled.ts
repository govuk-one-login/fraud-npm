import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class AccountEnabledEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.AccountEnabled;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.AccountEnabled;
}
