import { RiscEventTypes, RiscEventURIs } from '../enums/risc-events';
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
import { DEFAULT_URI } from './events-mapping';
import { TimestampTypes } from '../enums/events';
import { riscPopulatedEventsMapping } from './risc-maps';
import { TestInfo, validateSetEvents } from './event-mapping.test';

export const riscTestCases: TestInfo[] = [
  {
    type: RiscEventTypes.AccountPurged,
    schema: accountPurgedSchema,
    extraArgs: [],
  },
  {
    type: RiscEventTypes.AccountCredentialChangeRequired,
    schema: accountCredentialChangeRequiredSchema,
    extraArgs: [],
  },
  {
    type: RiscEventTypes.AccountDisabled,
    schema: accountDisabledSchema,
    extraArgs: [],
  },
  {
    type: RiscEventTypes.AccountEnabled,
    schema: accountEnabledSchema,
    extraArgs: [],
  },
  {
    type: RiscEventTypes.CredentialCompromise,
    schema: credentialCompromiseSchema,
    extraArgs: ['cred-type'],
  },
  {
    type: RiscEventTypes.IdentifierChanged,
    schema: identifierChangedSchema,
    extraArgs: ['ray@evans.com', 'ray@smith.com'],
  },
  {
    type: RiscEventTypes.IdentifierRecycled,
    schema: identifierRecycledSchema,
    extraArgs: ['ray@evans.com'],
  },
  {
    type: RiscEventTypes.OptIn,
    schema: optInSchema,
    extraArgs: [],
  },
  {
    type: RiscEventTypes.OptOutInitiated,
    schema: optOutInitiatedSchema,
    extraArgs: [],
  },
  {
    type: RiscEventTypes.OptOutCancelled,
    schema: optOutCancelledSchema,
    extraArgs: [],
  },
  {
    type: RiscEventTypes.OptOutEffective,
    schema: optOutEffectiveSchema,
    extraArgs: [],
  },
  {
    type: RiscEventTypes.RecoveryActivated,
    schema: recoveryActivatedSchema,
    extraArgs: [],
  },
  {
    type: RiscEventTypes.RecoveryInformationChanged,
    schema: recoveryInformationChangedSchema,
    extraArgs: [],
  },
  {
    type: RiscEventTypes.SessionsRevoked,
    schema: sessionsRevokedSchema,
    extraArgs: [],
  },
];

describe('populated RISC events', () => {
  it('check populated RISC events conforms to schemas', async () => {
    for (let testCase of riscTestCases) {
      const schema = testCase.schema;
      const extraArgs = testCase.extraArgs;
      const type = testCase.type as RiscEventTypes;
      const uri = RiscEventURIs[type].uri;
      const subjectFn = riscPopulatedEventsMapping[uri];

      let id = DEFAULT_URI;
      if (
        type == RiscEventTypes.IdentifierChanged ||
        type == RiscEventTypes.IdentifierRecycled
      ) {
        id = 'email';
      }

      const set: SETEvents = await subjectFn(id, 100, 100, ...extraArgs);

      await validateSetEvents(set, type, schema);
    }
  });
});
