import { SETEvents } from '../types/ssf';
import { DEFAULT_URI } from './events-mapping';
import { TimestampTypes } from '../enums/events';
import { CaepEventTypes, CaepEventURIs } from '../enums/caep-events';

import * as assuranceLevelChangeSchema from '../schemas/caep/assurance-level-change.json';
import * as credentialChangeSchema from '../schemas/caep/credential-change.json';
import * as deviceComplianceChangeSchema from '../schemas/caep/device-compliance-change.json';
import * as sessionRevokedSchema from '../schemas/caep/session-revoked.json';
import * as tokenClaimsChangeSchema from '../schemas/caep/token-claims-change.json';
import { caepPopulatedEventsMapping } from './caep-maps';
import { TestInfo, validateSetEvents } from './event-mapping.test';

const caepTestCases: TestInfo[] = [
  {
    type: CaepEventTypes.AssuranceLevelChange,
    schema: assuranceLevelChangeSchema,
    extraArgs: [
      'admin',
      'reason-admin',
      'reason-user',
      'increase',
      'nist-aal1',
      'nist-aal2',
    ],
  },
  {
    type: CaepEventTypes.CredentialChange,
    schema: credentialChangeSchema,
    extraArgs: [
      'admin',
      'reason-admin',
      'reason-user',
      'create',
      'password',
      'fido',
      'friendly-name',
      'x509-issuer',
      'x509-serial',
    ],
  },
  {
    type: CaepEventTypes.DeviceComplianceChange,
    schema: deviceComplianceChangeSchema,
    extraArgs: [
      'https://idp.example.com/123456789/',
      'e9297990-14d2-42ec-a4a9-4036db86509a',
      '123456789',
      'admin',
      'reason-admin',
      'reason-user',
      'compliant',
      'non-compliant',
    ],
  },
  {
    type: CaepEventTypes.SessionRevoked,
    schema: sessionRevokedSchema,
    extraArgs: [
      'dMTlD|1600802906337.16|16008.16',
      'https://idp.example.com/123456789/',
      '99beb27c-c1c2-4955-882a-e0dc4996fcbc',
      '123456789',
      'admin',
      'reason-admin',
      'reason-user',
    ],
  },
  {
    type: CaepEventTypes.TokenClaimsChange,
    schema: tokenClaimsChangeSchema,
    extraArgs: [
      'fish=chips;chalk=cheese',
      'jwt-id',
      'https://idp.example.com/123456789/',
      '123456',
      'admin',
      'reason-admin',
      'reason-user',
    ],
  },
];

describe('populated CAEP events', () => {
  it('check populated CAEP events conforms to schemas', async () => {
    for (let testCase of caepTestCases) {
      const schema = testCase.schema;
      const extraArgs = testCase.extraArgs;
      const type = testCase.type as CaepEventTypes;
      const uri = CaepEventURIs[type].uri;
      const subjectFn = caepPopulatedEventsMapping[uri];

      const set: SETEvents = await subjectFn(
        DEFAULT_URI,
        100,
        100,
        ...extraArgs
      );

      await validateSetEvents(set, type, schema);
    }
  });
});
