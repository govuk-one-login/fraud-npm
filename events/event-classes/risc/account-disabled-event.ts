import { RiscEventTypes } from "../../enums/risc-events";
import { BaseEvent } from "../BaseEvent";


export class AccountDisabledEvent extends BaseEvent {
  readonly eventType: RiscEventTypes = RiscEventTypes.AccountDisabled;

}
