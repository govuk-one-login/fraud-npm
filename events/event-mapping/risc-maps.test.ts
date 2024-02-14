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
import { SETEvents } from '../types/ssf';
import { DEFAULT_URI, EVENT_DETAILS_URI, EVENT_METADATA_URI } from './event-mapping';
import { ValidateService } from '../services/validate/validate';
import * as metadataSchema from '../schemas/extensions/metadata.json';
import { TimestampTypes } from '../enums/events';
import * as detailsSchema from '../schemas/extensions/event-details.json';
import { riscPopulatedEventMapping } from './risc-maps';
import util from 'util';
import { CaepEventTypes } from '../enums/caep-events';
import { TestInfo } from './event-mapping.test';
import * as assuranceLevelChangeSchema from '../schemas/caep/assurance-level-change.json';
import * as credentialChangeSchema from '../schemas/caep/credential-change.json';
import * as deviceComplianceChangeSchema from '../schemas/caep/device-compliance-change.json';
import * as sessionRevokedSchema from '../schemas/caep/session-revoked.json';
import * as tokenClaimsChangeSchema from '../schemas/caep/token-claims-change.json';

export const riscTestCases: Record<RiscEventTypes, TestInfo> = {
  [RiscEventTypes.AccountPurged] : { schema: accountPurgedSchema, extraArgs: [] },
  [RiscEventTypes.AccountCredentialChangeRequired] : { schema: accountCredentialChangeRequiredSchema, extraArgs: [] },
  [RiscEventTypes.AccountDisabled] : { schema: accountDisabledSchema, extraArgs: [] },
  [RiscEventTypes.AccountEnabled] : { schema: accountEnabledSchema, extraArgs: [] },
  [RiscEventTypes.CredentialCompromise] : { schema: credentialCompromiseSchema, extraArgs: ['cred-type'] },
  [RiscEventTypes.IdentifierChanged] : { schema: identifierChangedSchema, extraArgs: ['ray@evans.com', 'ray@smith.com'] },
  [RiscEventTypes.IdentifierRecycled] : { schema: identifierRecycledSchema, extraArgs: ['ray@evans.com'] },
  [RiscEventTypes.OptIn] : { schema: optInSchema, extraArgs: [] },
  [RiscEventTypes.OptOutInitiated] : { schema: optOutInitiatedSchema, extraArgs: [] },
  [RiscEventTypes.OptOutCancelled] : { schema: optOutCancelledSchema, extraArgs: [] },
  [RiscEventTypes.OptOutEffective] : { schema: optOutEffectiveSchema, extraArgs: [] },
  [RiscEventTypes.RecoveryActivated] : { schema: recoveryActivatedSchema, extraArgs: [] },
  [RiscEventTypes.RecoveryInformationChanged] : { schema: recoveryInformationChangedSchema, extraArgs: [] },
  [RiscEventTypes.SessionsRevoked] : { schema:sessionsRevokedSchema, extraArgs: [] },
};

describe('populated RISC events', () => {

  it('check populated RISC event conforms to schema', async () => {

    for (let prop in riscTestCases) {

      console.log(prop);

      const schema = riscTestCases[prop as RiscEventTypes].schema
      const extraArgs = riscTestCases[prop as RiscEventTypes].extraArgs
      const uri = RiscEventURIs[prop as RiscEventTypes].uri
      const subjectFn = riscPopulatedEventMapping[uri]

      let id = DEFAULT_URI
      if ((prop as RiscEventTypes) == RiscEventTypes.IdentifierChanged ||
        (prop as RiscEventTypes) == RiscEventTypes.IdentifierRecycled) {
        id = 'email'
      }

      const set: SETEvents = await subjectFn(id, TimestampTypes.timeStamp,
       100, 100, ...extraArgs)

      console.log(util.inspect(set, false, null, true /* enable colors */))

      const event = set[RiscEventURIs[prop as RiscEventTypes].uri]
      await ValidateService.validate(schema, event)

      const metadata = set[EVENT_METADATA_URI]
      await ValidateService.validate(metadataSchema, metadata)

      const details = set[EVENT_DETAILS_URI + RiscEventURIs[prop as RiscEventTypes].detailsKey + '/eventDetails']
      await ValidateService.validate(detailsSchema, details)
    }
  });

})




