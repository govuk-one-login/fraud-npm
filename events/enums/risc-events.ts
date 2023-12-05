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

  export const RiscEventKeys: Array<RiscEventTypes> = Object.keys(RiscEventTypes) as RiscEventTypes[];

  export const RiscEventURIs: Record<RiscEventTypes, string> = {
    [RiscEventTypes.AccountPurged]: 'https://schemas.openid.net/secevent/risc/event-type/account-purged',
    [RiscEventTypes.AccountCredentialChangeRequired]: 'https://schemas.openid.net/secevent/risc/event-type/account-credential-change-required',
    [RiscEventTypes.AccountDisabled]: 'https://schemas.openid.net/secevent/risc/event-type/account-disabled',
    [RiscEventTypes.AccountEnabled]: 'https://schemas.openid.net/secevent/risc/event-type/account-enabled',
    [RiscEventTypes.CredentialCompromise]: 'https://schemas.openid.net/secevent/risc/event-type/credential-compromise',
    [RiscEventTypes.IdentifierChanged]: 'https://schemas.openid.net/secevent/risc/event-type/identifier-changed',
    [RiscEventTypes.IdentifierRecycled]: 'https://schemas.openid.net/secevent/risc/event-type/identifier-recycled',
    [RiscEventTypes.OptIn]: 'https://schemas.openid.net/secevent/risc/event-type/opt-in',
    [RiscEventTypes.OptOutInitiated]:'https://schemas.openid.net/secevent/risc/event-type/opt-out-initiated',
    [RiscEventTypes.OptOutCancelled]:'https://schemas.openid.net/secevent/risc/event-type/opt-out-cancelled',
    [RiscEventTypes.OptOutEffective]:'https://schemas.openid.net/secevent/risc/event-type/opt-out-effective',
    [RiscEventTypes.RecoveryActivated]:'https://schemas.openid.net/secevent/risc/event-type/recovery-activated',
    [RiscEventTypes.RecoveryInformationChanged]: 'https://schemas.openid.net/secevent/risc/event-type/recovery-information-changed',
    [RiscEventTypes.SessionsRevoked]: 'https://schemas.openid.net/secevent/risc/event-type/sessions-revoked',
  }