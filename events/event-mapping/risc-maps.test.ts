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
import { EVENT_DETAILS_URI, EVENT_METADATA_URI, MOCK_URI } from './event-mapping';
import { ValidateService } from '../services/validate/validate';
import * as metadataSchema from '../schemas/extensions/metadata.json';
import { TimestampTypes } from '../enums/events';
import * as detailsSchema from '../schemas/extensions/event-details.json';
import { riscPopulatedEventMapping } from './risc-maps';

export const eventSchemaMapping: Record<RiscEventTypes, Schema> = {
  [RiscEventTypes.AccountPurged] : accountPurgedSchema,
  [RiscEventTypes.AccountCredentialChangeRequired] : accountCredentialChangeRequiredSchema,
  [RiscEventTypes.AccountDisabled] : accountDisabledSchema,
  [RiscEventTypes.AccountEnabled] : accountEnabledSchema,
  [RiscEventTypes.CredentialCompromise] : credentialCompromiseSchema,
  [RiscEventTypes.IdentifierChanged] : identifierChangedSchema,
  [RiscEventTypes.IdentifierRecycled] : identifierRecycledSchema,
  [RiscEventTypes.OptIn] : optInSchema,
  [RiscEventTypes.OptOutInitiated] : optOutInitiatedSchema,
  [RiscEventTypes.OptOutCancelled] : optOutCancelledSchema,
  [RiscEventTypes.OptOutEffective] : optOutEffectiveSchema,
  [RiscEventTypes.RecoveryActivated] : recoveryActivatedSchema,
  [RiscEventTypes.RecoveryInformationChanged] : recoveryInformationChangedSchema,
  [RiscEventTypes.SessionsRevoked] : sessionsRevokedSchema
};

describe('populated RISC events', () => {

  it('check populated RISC event conforms to schema', async () => {

    for (let prop in eventSchemaMapping) {

      const schema = eventSchemaMapping[prop as RiscEventTypes]
      const uri = RiscEventURIs[prop as RiscEventTypes].uri
      const subjectFn = riscPopulatedEventMapping[uri]

      let extraArgs: string[] = []

      switch (prop as RiscEventTypes) {
        case RiscEventTypes.IdentifierChanged:
          extraArgs = ['ray@evans.com', 'ray@smith.com']
          break
        case RiscEventTypes.IdentifierRecycled:
          extraArgs = ['ray@evans.com']
          break
        case RiscEventTypes.CredentialCompromise:
          extraArgs = ['cred-type']
          break
      }

      const set: SETEvents = await subjectFn(MOCK_URI, TimestampTypes.timeStamp,
       100, 100, ...extraArgs)

      const event = set[RiscEventURIs[prop as RiscEventTypes].uri]
      await ValidateService.validate(schema, event)

      const metadata = set[EVENT_METADATA_URI]
      await ValidateService.validate(metadataSchema, metadata)

      const details = set[EVENT_DETAILS_URI + RiscEventURIs[prop as RiscEventTypes].detailsKey + '/eventDetails']
      await ValidateService.validate(detailsSchema, details)
    }
  });

})




