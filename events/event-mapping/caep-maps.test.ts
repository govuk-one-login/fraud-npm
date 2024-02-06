import { RiscEventTypes, RiscEventURIs } from '../enums/risc-events';
import { Schema } from 'ajv';
import * as accountPurgedSchema from '../schemas/risc/account-purged.json';
import * as accountCredentialChangeRequiredSchema from '../schemas/risc/account-credential-change-required.json';
import * as accountDisabledSchema from '../schemas/risc/account-disabled.json';
import * as accountEnabledSchema from '../schemas/risc/account-enabled.json';
import * as credentialCompromiseSchema from '../schemas/risc/credential-compromise.json';
import * as identifierChangedSchema from '../schemas/risc/identifier-changed.json';
import * as identifierRecycledSchema from '../schemas/risc/identifier-recycled.json';
import * as optInSchema from '../schemas/risc/opt-in.json';
import * as optOutInitiatedSchema from '../schemas/risc/opt-out-initiated.json';
import * as optOutCancelledSchema from '../schemas/risc/opt-out-cancelled.json';
import * as optOutEffectiveSchema from '../schemas/risc/opt-out-effective.json';
import * as recoveryActivatedSchema from '../schemas/risc/recovery-activated.json';
import * as recoveryInformationChangedSchema from '../schemas/risc/recovery-information-changed.json';
import * as sessionsRevokedSchema from '../schemas/risc/sessions-revoked.json';
import { riscPopulatedEventMapping } from './risc-maps';
import { SETEvents } from '../types/ssf';
import { EVENT_DETAILS_URI, EVENT_METADATA_URI, MOCK_URI } from './event-mapping';
import { TimestampTypes } from '../enums/events';
import { ValidateService } from '../services/validate/validate';
import * as metadataSchema from '../schemas/extensions/metadata.json';
import * as detailsSchema from '../schemas/extensions/event-details.json';
import { CaepEventTypes, CaepEventURIs } from '../enums/caep-events';
import { AssuranceLevelChangeEvent } from '../event-classes/caep/assurance-level-change';
import { CredentialChangeEvent } from '../event-classes/caep/credential-change';
import { DeviceComplianceChangeEvent } from '../event-classes/caep/device-compliance-change';
import { SessionRevokedEvent } from '../event-classes/caep/session-revoked';
import { TokenClaimsChange } from '../event-classes/caep/token-claims-change';

import * as assuranceLevelChangeSchema from '../schemas/caep/assurance-level-change.json';
import * as credentialChangeSchema from '../schemas/caep/credential-change.json';
import * as deviceComplianceChangeSchema from '../schemas/caep/device-compliance-change.json';
import * as sessionRevokedSchema from '../schemas/caep/session-revoked.json';
import * as tokenClaimsChangeSchema from '../schemas/caep/token-claims-change.json';
import { caepPopulatedEventMapping } from './caep-maps';


export type CaepTestInfo = {
  schema : Schema,
  extraArgs: string[]
}

const caepTestCases: Record<CaepEventTypes, CaepTestInfo> = {
  [CaepEventTypes.AssuranceLevelChange] : { schema: assuranceLevelChangeSchema,
    extraArgs:['increase', 'nist-aal1', 'admin', 'nist-aal2', 'reason-admin', 'reason-user'] },
  [CaepEventTypes.CredentialChange] : { schema: credentialChangeSchema,
    extraArgs:['create', 'password', 'fido', 'friendly-name', 'admin', 'reason-admin', 'reason-user', 'x509-issuer', 'x509-serial'] },
  [CaepEventTypes.DeviceComplianceChange] : { schema: deviceComplianceChangeSchema, extraArgs:[] },
  [CaepEventTypes.SessionRevoked] : { schema: sessionRevokedSchema, extraArgs:[] },
  [CaepEventTypes.TokenClaimsChange] : { schema: tokenClaimsChangeSchema, extraArgs:[] },
};

describe('populated CAEP events', () => {

  it('check populated CAEP event conforms to schema', async () => {

    for (let testCase in caepTestCases) {

      console.log(testCase)

      const schema = caepTestCases[testCase as CaepEventTypes].schema
      const extraArgs = caepTestCases[testCase as CaepEventTypes].extraArgs
      const uri = CaepEventURIs[testCase as CaepEventTypes].uri
      const subjectFn = caepPopulatedEventMapping[uri]

      const set: SETEvents = await subjectFn(MOCK_URI, TimestampTypes.timeStamp,
        100, 100, ...extraArgs)

      const event = set[CaepEventURIs[testCase as CaepEventTypes].uri]
      await ValidateService.validate(schema, event)

      const metadata = set[EVENT_METADATA_URI]
      await ValidateService.validate(metadataSchema, metadata)

      const details = set[EVENT_DETAILS_URI + CaepEventURIs[testCase as CaepEventTypes].detailsKey + '/eventDetails']
      await ValidateService.validate(detailsSchema, details)
    }
  });

})
