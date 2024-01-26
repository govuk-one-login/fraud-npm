import { RiscEventTypes, RiscEventURIs } from '../enums/risc-events';
import { AccountCredentialChangeEvent } from '../event-classes/risc/account-credential-change-required';
import { AccountDisabledEvent } from '../event-classes/risc/account-disabled';
import { AccountPurgedEvent } from '../event-classes/risc/account-purged';
import { CredentialCompromiseEvent } from '../event-classes/risc/credential-compromise';
import { IdentifierChangedEvent } from '../event-classes/risc/identifier-changed';
import { IdentifierRecycledEvent } from '../event-classes/risc/identifier-recycled';
import { OptInEvent } from '../event-classes/risc/opt-in';
import { OptOutCancelledEvent } from '../event-classes/risc/opt-out-cancelled';
import { OptOutEffectiveEvent } from '../event-classes/risc/opt-out-effective';
import { OptOutInitiatedEvent } from '../event-classes/risc/opt-out-initiated';
import { RecoveryActivatedEvent } from '../event-classes/risc/recovery-activated';
import { RecoveryInformationChangedEvent } from '../event-classes/risc/recovery-information-changed';
import { SessionsRevokedEvent } from '../event-classes/risc/sessions-revoked';

export const riscEventMapping: Record<string, any> = {
  [RiscEventURIs[RiscEventTypes.AccountPurged].uri]: AccountPurgedEvent,
  [RiscEventURIs[RiscEventTypes.AccountDisabled].uri]: AccountDisabledEvent,
  [RiscEventURIs[RiscEventTypes.AccountPurged].uri]: AccountPurgedEvent,
  [RiscEventURIs[RiscEventTypes.AccountCredentialChangeRequired].uri]:
    AccountCredentialChangeEvent,
  [RiscEventURIs[RiscEventTypes.CredentialCompromise].uri]: CredentialCompromiseEvent,
  [RiscEventURIs[RiscEventTypes.IdentifierChanged].uri]: IdentifierChangedEvent,
  [RiscEventURIs[RiscEventTypes.IdentifierRecycled].uri]: IdentifierRecycledEvent,
  [RiscEventURIs[RiscEventTypes.OptIn].uri]: OptInEvent,
  [RiscEventURIs[RiscEventTypes.OptOutInitiated].uri]: OptOutInitiatedEvent,
  [RiscEventURIs[RiscEventTypes.OptOutCancelled].uri]: OptOutCancelledEvent,
  [RiscEventURIs[RiscEventTypes.OptOutEffective].uri]: OptOutEffectiveEvent,
  [RiscEventURIs[RiscEventTypes.RecoveryActivated].uri]: RecoveryActivatedEvent,
  [RiscEventURIs[RiscEventTypes.RecoveryInformationChanged].uri]:
    RecoveryInformationChangedEvent,
  [RiscEventURIs[RiscEventTypes.SessionsRevoked].uri]: SessionsRevokedEvent,
};
