import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/opt-in.json';
import { SsfSchema } from '../../types/ssf';

export class OptInEvent extends BaseEvent {
  constructor(message: SsfSchema) {
    super(message, RiscEventTypes.OptIn, TxmaEventNames.OptIn, eventSchema);
  }
}
