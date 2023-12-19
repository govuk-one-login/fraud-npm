import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/opt-out-cancelled.json';
import { SsfSchema } from '../../types/ssf';

export class OptOutCancelledEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      RiscEventTypes.OptOutCancelled,
      TxmaEventNames.OptOutCancelled,
      eventSchema,
      message
    );
  }
}
