import { CaepEventTypes } from '../../enums/caep-events';
import { TxmaEventNames } from '../../enums/event-names';
import { SsfSchema } from '../../types/ssf';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/caep/credential-change.json';

export class CredentialChangeEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      CaepEventTypes.CredentialChange,
      TxmaEventNames.CredentialChange,
      eventSchema,
      message
    );
  }
}
