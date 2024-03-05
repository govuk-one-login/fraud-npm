import { CaepEventTypes } from '../../enums/caep-events';
import { TxmaEventNames } from '../../enums/event-names';
import { SsfSchema } from '../../types/ssf';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/caep/assurance-level-change.json';

export class AssuranceLevelChangeEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      CaepEventTypes.AssuranceLevelChange,
      TxmaEventNames.AssuranceLevelChange,
      eventSchema,
      message
    );
  }
}
