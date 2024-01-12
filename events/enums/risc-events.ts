export enum RiscEventTypes {
  AccountPurged = 'accountPurged',
  AccountCredentialChangeRequired = 'accountCredentialChangeRequired',
  AccountDisabled = 'accountDisabled',
  AccountEnabled = 'accountEnabled',
  CredentialCompromise = 'credentialCompromise',
  IdentifierChanged = 'identifierChanged',
  IdentifierRecycled = 'identifierRecycled',
  OptIn = 'optIn',
  OptOutInitiated = 'optOutInitiated',
  OptOutCancelled = 'optOutCancelled',
  OptOutEffective = 'optOutEffective',
  RecoveryActivated = 'recoveryActivated',
  RecoveryInformationChanged = 'recoveryInformationChanged',
  SessionsRevoked = 'sessionsRevoked',
}

export const RiscEventKeys: Array<RiscEventTypes> = Object.keys(
  RiscEventTypes
) as RiscEventTypes[];

const RISC_SCHEMA_ROOT = 'https://schemas.openid.net/secevent/risc/event-type/'

export const RiscEventURIs: Record<RiscEventTypes, string> = {
  [RiscEventTypes.AccountPurged]: RISC_SCHEMA_ROOT + 'account-purged',
  [RiscEventTypes.AccountCredentialChangeRequired]: RISC_SCHEMA_ROOT + 'account-credential-change-required',
  [RiscEventTypes.AccountDisabled]: RISC_SCHEMA_ROOT + 'account-disabled',
  [RiscEventTypes.AccountEnabled]: RISC_SCHEMA_ROOT + 'account-enabled',
  [RiscEventTypes.CredentialCompromise]: RISC_SCHEMA_ROOT + 'credential-compromise',
  [RiscEventTypes.IdentifierChanged]: RISC_SCHEMA_ROOT + 'identifier-changed',
  [RiscEventTypes.IdentifierRecycled]: RISC_SCHEMA_ROOT + 'identifier-recycled',
  [RiscEventTypes.OptIn]: RISC_SCHEMA_ROOT + 'opt-in',
  [RiscEventTypes.OptOutInitiated]: RISC_SCHEMA_ROOT + 'opt-out-initiated',
  [RiscEventTypes.OptOutCancelled]: RISC_SCHEMA_ROOT + 'opt-out-cancelled',
  [RiscEventTypes.OptOutEffective]: RISC_SCHEMA_ROOT + 'opt-out-effective',
  [RiscEventTypes.RecoveryActivated]: RISC_SCHEMA_ROOT + 'recovery-activated',
  [RiscEventTypes.RecoveryInformationChanged]: RISC_SCHEMA_ROOT + 'recovery-information-changed',
  [RiscEventTypes.SessionsRevoked]: RISC_SCHEMA_ROOT + 'sessions-revoked',
};
