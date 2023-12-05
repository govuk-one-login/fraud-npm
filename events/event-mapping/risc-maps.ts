import { RiscEventTypes, RiscEventURIs } from '../enums/risc-events';
import { BaseEvent } from '../event-classes/BaseEvent';
import { AccountDisabledEvent } from '../event-classes/risc/account-disabled-event';
import { CredentialCompromiseEvent } from '../event-classes/risc/credential-compromise-event';
import { IdentifierChangedEvent } from '../event-classes/risc/identifier-changed-event';
import { IdentifierRecycledEvent } from '../event-classes/risc/identifier-recycled-event';

export const riscEventMapping: Record<
  (typeof RiscEventURIs)[RiscEventTypes],
  BaseEvent
> = {
  [RiscEventURIs[RiscEventTypes.AccountPurged]]: BaseEvent,
  [RiscEventURIs[RiscEventTypes.AccountDisabled]]: AccountDisabledEvent,
  [RiscEventURIs[RiscEventTypes.AccountDisabled]]: BaseEvent,
  [RiscEventURIs[RiscEventTypes.AccountCredentialChangeRequired]]: BaseEvent,
  [RiscEventURIs[RiscEventTypes.CredentialCompromise]]:
    CredentialCompromiseEvent,
  [RiscEventURIs[RiscEventTypes.IdentifierChanged]]: IdentifierChangedEvent,
  [RiscEventURIs[RiscEventTypes.IdentifierRecycled]]: IdentifierRecycledEvent,
  [RiscEventURIs[RiscEventTypes.OptIn]]: BaseEvent,
  [RiscEventURIs[RiscEventTypes.OptOutInitiated]]: BaseEvent,
  [RiscEventURIs[RiscEventTypes.OptOutCancelled]]: BaseEvent,
  [RiscEventURIs[RiscEventTypes.OptOutEffective]]: BaseEvent,
  [RiscEventURIs[RiscEventTypes.RecoveryActivated]]: BaseEvent,
  [RiscEventURIs[RiscEventTypes.RecoveryInformationChanged]]: BaseEvent,
  [RiscEventURIs[RiscEventTypes.SessionsRevoked]]: BaseEvent,
};
