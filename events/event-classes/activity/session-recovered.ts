import { ActivityEventTypes } from '../../enums/activity-events';
import { TxmaEventNames } from '../../enums/event-names';
import { SETEvents, SsfSchema } from '../../types/ssf';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/activity/session-recovered.json';
import { AllEventURIs, IdentifierTypes } from '../../enums/events';

export class SessionRecoveredEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      ActivityEventTypes.SessionRecovered,
      TxmaEventNames.SessionRecovered,
      eventSchema,
      message
    );
  }
}
