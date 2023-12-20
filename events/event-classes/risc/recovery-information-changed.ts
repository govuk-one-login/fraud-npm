import { TxmaEventNames } from '../../enums/event-names';
import { RiscEventTypes } from '../../enums/risc-events';
import { SsfSchema } from '../../types/ssf';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/risc/recovery-information-changed.json';

export class RecoveryInformationChangedEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      RiscEventTypes.RecoveryInformationChanged,
      TxmaEventNames.RecoveryInformationChanged,
      eventSchema,
      message
    );
  }
}
