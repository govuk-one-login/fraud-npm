import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/identifier-changed.json';
import { SsfSchema } from '../../types/ssf';

export class IdentifierChangedEvent extends BaseEvent {
  constructor(message: SsfSchema) {
    super(
      message,
      RiscEventTypes.IdentifierChanged,
      TxmaEventNames.IdentifierChanged,
      eventSchema
    );
  }
}
