import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class AccountCredentialChangeEvent extends BaseEvent {
  readonly eventType: RiscEventTypes =
    RiscEventTypes.AccountCredentialChangeRequired;
}
