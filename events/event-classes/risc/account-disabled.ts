import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/account-disabled.json';
import { SsfSchema } from '../../types/ssf';

export class AccountDisabledEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      RiscEventTypes.AccountDisabled,
      TxmaEventNames.AccountDisabled,
      eventSchema,
      message
    );
  }
}
