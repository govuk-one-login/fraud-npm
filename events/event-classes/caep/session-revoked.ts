import { CaepEventTypes } from '../../enums/caep-events';
import { TxmaEventNames } from '../../enums/event-names';
import { BaseEvent } from '../base-event';
import * as eventSchema from '../../schemas/caep/session-revoked.json';
import { SsfSchema } from '../../types/ssf';

export class SessionRevokedEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      CaepEventTypes.SessionRevoked,
      TxmaEventNames.SessionRevoked,
      eventSchema,
      message
    );
  }
}
