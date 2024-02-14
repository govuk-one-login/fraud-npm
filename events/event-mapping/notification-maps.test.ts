import * as accountConcernSchema from '../schemas/notification/account-concern.json';
import * as accountBlockSchema from '../schemas/notification/account-block.json';
import * as deviceConcernSchema from '../schemas/notification/device-concern.json';
import * as metadataSchema from '../schemas/extensions/metadata.json';
import * as detailsSchema from '../schemas/extensions/event-details.json';

import * as util from 'util';
import { NotificationEventTypes, NotificationEventURIs } from '../enums/notification-events';
import { SETEvents } from '../types/ssf';
import { Schema } from 'ajv';
import { AllEventTypes, TimestampTypes } from '../enums/events';
import { notificationPopulatedEventMapping } from './notification-maps';
import { DEFAULT_URI, EVENT_DETAILS_URI, EVENT_METADATA_URI } from './event-mapping';
import { ValidateService } from '../services/validate/validate';

export type TestInfoPlus = {
  type: AllEventTypes, schema: Schema, extraArgs: (string | null) []
}

const notificationTestCases: TestInfoPlus[] = [{
  type: NotificationEventTypes.AccountConcern,
  schema: accountConcernSchema,
  extraArgs: ['admin', 'reason-admin', 'reason-user', 'increase', 'nist-aal1', 'nist-aal2'],
}, {
  type: NotificationEventTypes.AccountBlock,
  schema: accountBlockSchema,
  extraArgs: ['admin', 'reason-admin', 'reason-user', 'increase', 'nist-aal1', 'nist-aal2'],
}, {
  type: NotificationEventTypes.DeviceConcern,
  schema: deviceConcernSchema,
  extraArgs: ['admin', 'reason-admin', 'reason-user', 'increase', 'nist-aal1', 'nist-aal2'],
}];

describe('populated notification events', () => {

  it('check populated notification event conforms to schema', async () => {

    for (let testCase of notificationTestCases) {

      console.log(testCase);

      const schema = testCase.schema;
      const extraArgs = testCase.extraArgs;
      const type = testCase.type as NotificationEventTypes;
      const uri = NotificationEventURIs[type].uri;
      const subjectFn = notificationPopulatedEventMapping[uri];

      const set: SETEvents = await subjectFn(DEFAULT_URI, TimestampTypes.timeStamp, 100000, 100000, ...extraArgs);

      console.log(util.inspect(set, false, null, true /* enable colors */));

      const event = set[NotificationEventURIs[type].uri];
      await ValidateService.validate(schema, event);

      const metadata = set[EVENT_METADATA_URI];
      await ValidateService.validate(metadataSchema, metadata);

      const details = set[EVENT_DETAILS_URI + NotificationEventURIs[type].detailsKey + '/eventDetails'];
      await ValidateService.validate(detailsSchema, details);
    }
  });

});
