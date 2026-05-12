import { BaseEvent } from '../base-event';
import { SsfSchema } from '../../types/ssf';
import { NotificationEventTypes } from '../../enums/notification-events';
import { TxmaEventNames } from '../../enums/event-names';
import * as eventSchema from '../../schemas/notification/subject-group.json';

export class SubjectGroupEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      NotificationEventTypes.SubjectGroup,
      TxmaEventNames.SubjectGroup,
      eventSchema,
      message
    );
  }
}
