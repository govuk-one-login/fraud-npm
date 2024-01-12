export enum CaepEventTypes {
  AssuranceLevelChange = 'assuranceLevelChange',
  CredentialChange = 'credentialChange',
  DeviceComplianceChange = 'deviceComplianceChange',
  SessionRevoked = 'sessionRevoked',
  TokenClaimsChange = 'tokenClaimsChange',
}

export const CaepEventKeys: Array<CaepEventTypes> = Object.keys(
  CaepEventTypes
) as CaepEventTypes[];

const CAEP_SCHEMA_ROOT = 'https://schemas.openid.net/secevent/caep/event-type/'

export const CaepEventURIs: Record<CaepEventTypes, string> = {
  [CaepEventTypes.AssuranceLevelChange]: CAEP_SCHEMA_ROOT + 'assurance-level-change',
  [CaepEventTypes.CredentialChange]: CAEP_SCHEMA_ROOT + 'credential-change',
  [CaepEventTypes.DeviceComplianceChange]: CAEP_SCHEMA_ROOT + 'device-compliance-change',
  [CaepEventTypes.SessionRevoked]: CAEP_SCHEMA_ROOT + 'session-revoked',
  [CaepEventTypes.TokenClaimsChange]: CAEP_SCHEMA_ROOT + 'token-claims-change',
};
