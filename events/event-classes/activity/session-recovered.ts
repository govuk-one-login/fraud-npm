import { BaseEvent } from '../base-event';

import { ActivityEventTypes } from '../../enums/activity-events';
import { TxmaEventNames } from '../../enums/event-names';
import { SsfSchema } from '../../types/ssf';

import * as eventSchema from '../../schemas/activity/session-recovered.json';

export class SessionRecoveredEvent extends BaseEvent {
  constructor(message: SsfSchema) {
    super(
      message,
      ActivityEventTypes.SessionRecovered,
      TxmaEventNames.SessionRecovered,
      eventSchema
    );
  }
}
