import { BaseEvent } from '../base-event';
import { SsfSchema } from '../../types/ssf';
import { NotificationEventTypes } from '../../enums/notification-events';
import { TxmaEventNames } from '../../enums/event-names';
import * as eventSchema from '../../schemas/notification/account-block.json';

export class AccountBlockEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      NotificationEventTypes.AccountBlock,
      TxmaEventNames.AccountBlock,
      eventSchema,
      message
    );
  }
}
