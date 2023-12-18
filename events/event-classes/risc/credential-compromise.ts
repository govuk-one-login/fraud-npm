import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/credential-compromise.json';
import { SsfSchema } from '../../types/ssf';

export class CredentialCompromiseEvent extends BaseEvent {
  constructor(message: SsfSchema) {
    super(
      message,
      RiscEventTypes.CredentialCompromise,
      TxmaEventNames.CredentialCompromise,
      eventSchema
    );
  }
}
