import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { SsfSchema } from '../../types/ssf';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/sessions-revoked.json';

export class SessionsRevokedEvent extends BaseEvent {
  constructor(message: SsfSchema) {
    super(
      message,
      RiscEventTypes.SessionsRevoked,
      TxmaEventNames.SessionsRevoked,
      eventSchema
    );
  }
}
