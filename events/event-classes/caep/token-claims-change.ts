import { CaepEventTypes } from '../../enums/caep-events';
import { TxmaEventNames } from '../../enums/event-names';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/caep/token-claims-change.json';
import { SsfSchema } from '../../types/ssf';

export class TokenClaimsChange extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      CaepEventTypes.TokenClaimsChange,
      TxmaEventNames.TokenClaimsChange,
      eventSchema,
      message
    );
  }
}
