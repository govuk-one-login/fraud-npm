import { TxmaEventNames } from '../../enums/event-names';
import { NotificationEventTypes } from '../../enums/notification-events';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/notification/account-concern.json';
import { SsfSchema } from '../../types/ssf';

export class AccountConcernEvent extends BaseEvent {
  constructor(message: SsfSchema) {
    super(
      message,
      NotificationEventTypes.AccountConcern,
      TxmaEventNames.AccountConcern,
      eventSchema
    );
  }
}
