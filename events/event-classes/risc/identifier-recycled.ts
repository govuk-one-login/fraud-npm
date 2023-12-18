import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/identifier-recycled.json';
import { SsfSchema } from '../../types/ssf';

export class IdentifierRecycledEvent extends BaseEvent {
  constructor(message: SsfSchema) {
    super(
      message,
      RiscEventTypes.IdentifierRecycled,
      TxmaEventNames.IdentifierRecycled,
      eventSchema
    );
  }
}
