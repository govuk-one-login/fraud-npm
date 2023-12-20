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

export const CaepEventURIs: Record<CaepEventTypes, string> = {
  [CaepEventTypes.AssuranceLevelChange]:
    'https://schemas.openid.net/secevent/caep/event-type/assurance-level-change',
  [CaepEventTypes.CredentialChange]:
    'https://schemas.openid.net/secevent/caep/event-type/credential-change',
  [CaepEventTypes.DeviceComplianceChange]:
    'https://schemas.openid.net/secevent/caep/event-type/device-compliance-change',
  [CaepEventTypes.SessionRevoked]:
    'https://schemas.openid.net/secevent/caep/event-type/session-revoked',
  [CaepEventTypes.TokenClaimsChange]:
    'https://schemas.openid.net/secevent/caep/event-type/token-claims-change',
};
