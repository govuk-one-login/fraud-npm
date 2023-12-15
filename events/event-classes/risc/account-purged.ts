import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class AccountPurgedEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.AccountPurged;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.AccountPurged;
}
