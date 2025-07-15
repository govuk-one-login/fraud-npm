import { TxmaEventNames } from '../../enums/event-names';
import { NotificationEventTypes } from '../../enums/notification-events';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/notification/credential-concern.json';
import { SsfSchema } from '../../types/ssf';

export class CredentialConcernEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      NotificationEventTypes.CredentialConcern,
      TxmaEventNames.CredentialConcern,
      eventSchema,
      message
    );
  }
}
