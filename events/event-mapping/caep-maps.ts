import { CaepEventTypes, CaepEventURIs } from '../enums/caep-events';
import { AssuranceLevelChangeEvent } from '../event-classes/caep/assurance-level-change';
import { CredentialChangeEvent } from '../event-classes/caep/credential-change';
import { DeviceComplianceChangeEvent } from '../event-classes/caep/device-compliance-change';
import { SessionRevokedEvent } from '../event-classes/caep/session-revoked';
import { TokenClaimsChange } from '../event-classes/caep/token-claims-change';

export const caepEventMapping: Record<string, any> = {
  [CaepEventURIs[CaepEventTypes.AssuranceLevelChange].uri]: AssuranceLevelChangeEvent,
  [CaepEventURIs[CaepEventTypes.CredentialChange].uri]: CredentialChangeEvent,
  [CaepEventURIs[CaepEventTypes.DeviceComplianceChange].uri]: DeviceComplianceChangeEvent,
  [CaepEventURIs[CaepEventTypes.SessionRevoked].uri]: SessionRevokedEvent,
  [CaepEventURIs[CaepEventTypes.TokenClaimsChange].uri]: TokenClaimsChange,
};
