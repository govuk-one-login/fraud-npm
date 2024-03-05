import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { SsfSchema } from '../../types/ssf';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/account-credential-change-required.json';

export class AccountCredentialChangeEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      RiscEventTypes.AccountCredentialChangeRequired,
      TxmaEventNames.AccountCredentialChange,
      eventSchema,
      message
    );
  }
}
