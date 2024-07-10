import { UriInfo } from './events';

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

const CAEP_SCHEMA_ROOT = 'https://schemas.openid.net/secevent/caep/event-type/';

export const CaepEventURIs: Record<CaepEventTypes, UriInfo> = {
  [CaepEventTypes.AssuranceLevelChange]: {
    uri: CAEP_SCHEMA_ROOT + 'assurance-level-change',
    detailsKey: 'assuranceLevelChange',
  },
  [CaepEventTypes.CredentialChange]: {
    uri: CAEP_SCHEMA_ROOT + 'credential-change',
    detailsKey: 'credentialChange',
  },
  [CaepEventTypes.DeviceComplianceChange]: {
    uri: CAEP_SCHEMA_ROOT + 'device-compliance-change',
    detailsKey: 'deviceComplianceChange',
  },
  [CaepEventTypes.SessionRevoked]: {
    uri: CAEP_SCHEMA_ROOT + 'session-revoked',
    detailsKey: 'sessionRevoked',
  },
  [CaepEventTypes.TokenClaimsChange]: {
    uri: CAEP_SCHEMA_ROOT + 'token-claims-change',
    detailsKey: 'tokenClaimsChange',
  },
};
