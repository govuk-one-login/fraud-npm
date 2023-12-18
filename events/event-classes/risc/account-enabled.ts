import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/account-enabled.json';
import { SsfSchema } from '../../types/ssf';

export class AccountEnabledEvent extends BaseEvent {
  constructor(message: SsfSchema) {
    super(
      message,
      RiscEventTypes.AccountEnabled,
      TxmaEventNames.AccountEnabled,
      eventSchema
    );
  }
}
