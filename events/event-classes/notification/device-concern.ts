import { TxmaEventNames } from '../../enums/event-names';
import { NotificationEventTypes } from '../../enums/notification-events';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/notification/device-concern.json';
import { SsfSchema } from '../../types/ssf';

export class DeviceConcernEvent extends BaseEvent {
  constructor(message: SsfSchema) {
    super(
      message,
      NotificationEventTypes.DeviceConcern,
      TxmaEventNames.DeviceConcern,
      eventSchema
    );
  }
}
