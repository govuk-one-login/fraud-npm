import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/opt-out-effective.json';
import { SsfSchema } from '../../types/ssf';

export class OptOutEffectiveEvent extends BaseEvent {
  constructor(message: SsfSchema) {
    super(
      message,
      RiscEventTypes.OptOutEffective,
      TxmaEventNames.OptOutEffective,
      eventSchema
    );
  }
}
