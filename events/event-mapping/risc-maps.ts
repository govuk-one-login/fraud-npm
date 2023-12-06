import { RiscEventTypes, RiscEventURIs } from '../enums/risc-events';
import { BaseEvent } from '../event-classes/BaseEvent';
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

export const riscEventMapping: Record<
  (typeof RiscEventURIs)[RiscEventTypes],
  BaseEvent
> = {
  [RiscEventURIs[RiscEventTypes.AccountPurged]]: AccountPurgedEvent,
  [RiscEventURIs[RiscEventTypes.AccountDisabled]]: AccountDisabledEvent,
  [RiscEventURIs[RiscEventTypes.AccountPurged]]: AccountPurgedEvent,
  [RiscEventURIs[RiscEventTypes.AccountCredentialChangeRequired]]:
    AccountCredentialChangeEvent,
  [RiscEventURIs[RiscEventTypes.CredentialCompromise]]:
    CredentialCompromiseEvent,
  [RiscEventURIs[RiscEventTypes.IdentifierChanged]]: IdentifierChangedEvent,
  [RiscEventURIs[RiscEventTypes.IdentifierRecycled]]: IdentifierRecycledEvent,
  [RiscEventURIs[RiscEventTypes.OptIn]]: OptInEvent,
  [RiscEventURIs[RiscEventTypes.OptOutInitiated]]: OptOutInitiatedEvent,
  [RiscEventURIs[RiscEventTypes.OptOutCancelled]]: OptOutCancelledEvent,
  [RiscEventURIs[RiscEventTypes.OptOutEffective]]: OptOutEffectiveEvent,
  [RiscEventURIs[RiscEventTypes.RecoveryActivated]]: RecoveryActivatedEvent,
  [RiscEventURIs[RiscEventTypes.RecoveryInformationChanged]]:
    RecoveryInformationChangedEvent,
  [RiscEventURIs[RiscEventTypes.SessionsRevoked]]: SessionsRevokedEvent,
};
