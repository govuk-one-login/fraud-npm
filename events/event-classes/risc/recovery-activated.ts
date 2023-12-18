import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { SsfSchema } from '../../types/ssf';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/recovery-activated.json';

export class RecoveryActivatedEvent extends BaseEvent {
  constructor(message: SsfSchema) {
    super(
      message,
      RiscEventTypes.RecoveryActivated,
      TxmaEventNames.RecoveryActivated,
      eventSchema
    );
  }
}
