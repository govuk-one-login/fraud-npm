import * as accountConcernSchema from '../schemas/notification/account-concern.json';
import * as accountBlockSchema from '../schemas/notification/account-block.json';
import * as deviceConcernSchema from '../schemas/notification/device-concern.json';
import {
  NotificationEventTypes,
  NotificationEventURIs,
} from '../enums/notification-events';
import { SETEvents } from '../types/ssf';
import { TimestampTypes } from '../enums/events';
import { notificationPopulatedEventsMapping } from './notification-maps';
import { DEFAULT_URI } from './events-mapping';
import { TestInfo, validateSetEvents } from './event-mapping.test';

const notificationTestCases: TestInfo[] = [
  {
    type: NotificationEventTypes.AccountConcern,
    schema: accountConcernSchema,
    extraArgs: ['rationale-code', 'admin', 'reason-admin'],
  },
  {
    type: NotificationEventTypes.AccountBlock,
    schema: accountBlockSchema,
    extraArgs: ['admin', 'reason-admin'],
  },
  {
    type: NotificationEventTypes.DeviceConcern,
    schema: deviceConcernSchema,
    extraArgs: ['rationale-code', 'admin', 'reason-admin'],
  },
];

describe('populated notification events', () => {
  it('check populated notification events conforms to schemas', async () => {
    for (let testCase of notificationTestCases) {
      const schema = testCase.schema;
      const extraArgs = testCase.extraArgs;
      const type = testCase.type as NotificationEventTypes;
      const uri = NotificationEventURIs[type].uri;
      const subjectFn = notificationPopulatedEventsMapping[uri];

      const set: SETEvents = await subjectFn(
        DEFAULT_URI,
        1000,
        2000,
        ...extraArgs
      );

      await validateSetEvents(set, type, schema);
    }
  });
});
