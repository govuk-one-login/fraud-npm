import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../BaseEvent';

export class AccountPurgedEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.AccountPurged;
}
