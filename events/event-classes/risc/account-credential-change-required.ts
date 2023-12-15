import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class AccountCredentialChangeEvent extends BaseEvent {
  readonly eventType: RiscEventTypes =
    RiscEventTypes.AccountCredentialChangeRequired;
  readonly txmaEventName: TxmaEventNames =
    TxmaEventNames.AccountCredentialChange;
}
