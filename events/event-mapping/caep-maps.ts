import { CaepEventTypes, CaepEventURIs } from '../enums/caep-events';
import { BaseEvent } from '../event-classes/BaseEvent';
import { AssuranceLevelChangeEvent } from '../event-classes/caep/assurance-level-change';
import { CredentialChangeEvent } from '../event-classes/caep/credential-change';
import { DeviceComplianceChangeEvent } from '../event-classes/caep/device-compliance-change';
import { SessionRevokedEvent } from '../event-classes/caep/session-revoked';
import { TokenClaimsChange } from '../event-classes/caep/token-claims-change';

export const caepEventMapping: Record<
  (typeof CaepEventURIs)[CaepEventTypes],
  typeof BaseEvent
> = {
  [CaepEventURIs[CaepEventTypes.AssuranceLevelChange]]:
    AssuranceLevelChangeEvent,
  [CaepEventURIs[CaepEventTypes.CredentialChange]]: CredentialChangeEvent,
  [CaepEventURIs[CaepEventTypes.DeviceComplianceChange]]:
    DeviceComplianceChangeEvent,
  [CaepEventURIs[CaepEventTypes.SessionRevoked]]: SessionRevokedEvent,
  [CaepEventURIs[CaepEventTypes.TokenClaimsChange]]: TokenClaimsChange,
};
