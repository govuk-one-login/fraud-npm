import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { SsfSchema } from '../../types/ssf';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/opt-out-initiated.json';

export class OptOutInitiatedEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      RiscEventTypes.OptOutInitiated,
      TxmaEventNames.OptOutInitiated,
      eventSchema,
      message
    );
  }
}
