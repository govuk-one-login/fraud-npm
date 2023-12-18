import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/account-purged.json';
import { SsfSchema } from '../../types/ssf';

export class AccountPurgedEvent extends BaseEvent {
  constructor(message: SsfSchema) {
    super(
      message,
      RiscEventTypes.AccountPurged,
      TxmaEventNames.AccountPurged,
      eventSchema
    );
  }
}
