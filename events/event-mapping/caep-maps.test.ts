import { Schema } from 'ajv';
import { SETEvents } from '../types/ssf';
import { DEFAULT_URI, EVENT_DETAILS_URI, EVENT_METADATA_URI } from './event-mapping';
import { TimestampTypes } from '../enums/events';
import { ValidateService } from '../services/validate/validate';
import * as metadataSchema from '../schemas/extensions/metadata.json';
import * as detailsSchema from '../schemas/extensions/event-details.json';
import { CaepEventTypes, CaepEventURIs } from '../enums/caep-events';

import * as assuranceLevelChangeSchema from '../schemas/caep/assurance-level-change.json';
import * as credentialChangeSchema from '../schemas/caep/credential-change.json';
import * as deviceComplianceChangeSchema from '../schemas/caep/device-compliance-change.json';
import * as sessionRevokedSchema from '../schemas/caep/session-revoked.json';
import * as tokenClaimsChangeSchema from '../schemas/caep/token-claims-change.json';
import { caepPopulatedEventMapping } from './caep-maps';
import * as util from 'util';
import { TestInfo } from './event-mapping.test';

const caepTestCases: Record<CaepEventTypes, TestInfo> = {
  [CaepEventTypes.AssuranceLevelChange] : { schema: assuranceLevelChangeSchema,
    extraArgs:['admin', 'reason-admin', 'reason-user', 'increase', 'nist-aal1','nist-aal2', ] },
  [CaepEventTypes.CredentialChange] : { schema: credentialChangeSchema,
    extraArgs:['admin', 'reason-admin', 'reason-user', 'create', 'password', 'fido',
      'friendly-name','x509-issuer', 'x509-serial'] },
  [CaepEventTypes.DeviceComplianceChange] : { schema: deviceComplianceChangeSchema,
    extraArgs:['https://idp.example.com/123456789/',
      'e9297990-14d2-42ec-a4a9-4036db86509a', '123456789', 'admin', 'reason-admin',
        'reason-user', 'compliant', 'non-compliant'] },
  [CaepEventTypes.SessionRevoked] : { schema: sessionRevokedSchema,
    extraArgs:['dMTlD|1600802906337.16|16008.16',
      'https://idp.example.com/123456789/', '99beb27c-c1c2-4955-882a-e0dc4996fcbc', '123456789',
         'admin', 'reason-admin', 'reason-user'] },
  [CaepEventTypes.TokenClaimsChange] : { schema: tokenClaimsChangeSchema,
    extraArgs:['fish=chips;chalk=cheese', 'jwt-id', 'https://idp.example.com/123456789/',
      '123456', 'admin', 'reason-admin', 'reason-user', ] },
};

describe('populated CAEP events', () => {

  it('check populated CAEP event conforms to schema', async () => {

    for (let testCase in caepTestCases) {

      console.log(testCase)

      const schema = caepTestCases[testCase as CaepEventTypes].schema
      const extraArgs = caepTestCases[testCase as CaepEventTypes].extraArgs
      const uri = CaepEventURIs[testCase as CaepEventTypes].uri
      const subjectFn = caepPopulatedEventMapping[uri]

      const set: SETEvents = await subjectFn(DEFAULT_URI, TimestampTypes.timeStamp,
        100, 100, ...extraArgs)

      console.log(util.inspect(set, false, null, true /* enable colors */))

      const event = set[CaepEventURIs[testCase as CaepEventTypes].uri]
      await ValidateService.validate(schema, event)

      const metadata = set[EVENT_METADATA_URI]
      await ValidateService.validate(metadataSchema, metadata)

      const details = set[EVENT_DETAILS_URI + CaepEventURIs[testCase as CaepEventTypes].detailsKey + '/eventDetails']
      await ValidateService.validate(detailsSchema, details)
    }
  });

})
