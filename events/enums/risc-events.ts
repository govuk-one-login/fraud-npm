import { UriInfo } from './events';

export enum RiscEventTypes {
  AccountPurged = 'accountPurged',
  AccountCredentialChangeRequired = 'accountCredentialChangeRequired',
  AccountDisabled = 'accountDisabled',
  AccountEnabled = 'accountEnabled',
  CredentialCompromise = 'credentialCompromise',
  OptIn = 'optIn',
  OptOutInitiated = 'optOutInitiated',
  OptOutCancelled = 'optOutCancelled',
  OptOutEffective = 'optOutEffective',
  RecoveryActivated = 'recoveryActivated',
  RecoveryInformationChanged = 'recoveryInformationChanged',
}
export const RiscEventKeys: Array<RiscEventTypes> = Object.keys(
  RiscEventTypes
) as RiscEventTypes[];

const RISC_SCHEMA_ROOT = 'https://schemas.openid.net/secevent/risc/event-type/';

export const RiscEventURIs: Record<RiscEventTypes, UriInfo> = {
  [RiscEventTypes.AccountPurged]: {
    uri: RISC_SCHEMA_ROOT + 'account-purged',
    detailsKey: 'accountPurged',
  },
  [RiscEventTypes.AccountCredentialChangeRequired]: {
    uri: RISC_SCHEMA_ROOT + 'account-credential-change-required',
    detailsKey: 'changeRequired',
  },
  [RiscEventTypes.AccountDisabled]: {
    uri: RISC_SCHEMA_ROOT + 'account-disabled',
    detailsKey: 'accountDisabled',
  },
  [RiscEventTypes.AccountEnabled]: {
    uri: RISC_SCHEMA_ROOT + 'account-enabled',
    detailsKey: 'accountEnabled',
  },
  [RiscEventTypes.CredentialCompromise]: {
    uri: RISC_SCHEMA_ROOT + 'credential-compromise',
    detailsKey: 'credentialCompromise',
  },
  [RiscEventTypes.OptIn]: {
    uri: RISC_SCHEMA_ROOT + 'opt-in',
    detailsKey: 'optIn',
  },
  [RiscEventTypes.OptOutInitiated]: {
    uri: RISC_SCHEMA_ROOT + 'opt-out-initiated',
    detailsKey: 'optOutInitiated',
  },
  [RiscEventTypes.OptOutCancelled]: {
    uri: RISC_SCHEMA_ROOT + 'opt-out-cancelled',
    detailsKey: 'optOutCancelled',
  },
  [RiscEventTypes.OptOutEffective]: {
    uri: RISC_SCHEMA_ROOT + 'opt-out-effective',
    detailsKey: 'optOutEffective',
  },
  [RiscEventTypes.RecoveryActivated]: {
    uri: RISC_SCHEMA_ROOT + 'recovery-activated',
    detailsKey: 'recoveryActivated',
  },
  [RiscEventTypes.RecoveryInformationChanged]: {
    uri: RISC_SCHEMA_ROOT + 'recovery-information-changed',
    detailsKey: 'recoveryInformationChanged',
  },
};
