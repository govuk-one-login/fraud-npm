import { CaepEventTypes, CaepEventURIs } from '../enums/caep-events';
import { AssuranceLevelChangeEvent } from '../event-classes/caep/assurance-level-change';
import { CredentialChangeEvent } from '../event-classes/caep/credential-change';
import { DeviceComplianceChangeEvent } from '../event-classes/caep/device-compliance-change';
import { SessionRevokedEvent } from '../event-classes/caep/session-revoked';
import { TokenClaimsChange } from '../event-classes/caep/token-claims-change';
import { AllEventURIs, TimestampTypes } from '../enums/events';
import { SETEvents } from '../types/ssf';
import { RiscEventTypes, RiscEventURIs } from '../enums/risc-events';
import { DEFAULT_LOCATION, generateStandardUserSubjectEvent } from './event-mapping';

export const caepEventMapping: Record<string, any> = {
  [CaepEventURIs[CaepEventTypes.AssuranceLevelChange].uri]: AssuranceLevelChangeEvent,
  [CaepEventURIs[CaepEventTypes.CredentialChange].uri]: CredentialChangeEvent,
  [CaepEventURIs[CaepEventTypes.DeviceComplianceChange].uri]: DeviceComplianceChangeEvent,
  [CaepEventURIs[CaepEventTypes.SessionRevoked].uri]: SessionRevokedEvent,
  [CaepEventURIs[CaepEventTypes.TokenClaimsChange].uri]: TokenClaimsChange,
};

const DEFAULT_CHANGE_DIRECTION = 'increase'
const DEFAULT_LEVEL = 'nist-aal1'
const DEFAULT_PREVIOUS_LEVEL = 'nist-aal2'
const DEFAULT_CHANGE_TYPE = 'create'
const DEFAULT_CREDENTIAL_TYPE = 'password'
const DEFAULT_FIDO_AAGUID = 'accced6a-63f5-490a-9eea-e59bc1896cfc'
const DEFAULT_FRIENDLY_NAME = 'Jane\'s USB authenticator'
const DEFAULT_INITIATING_ENTITY = 'admin'
const DEFAULT_REASON_ADMIN = 'User self-enrollment'
const DEFAULT_REASON_USER = 'User self-enrollment'

export const caepPopulatedEventMapping: Record<string, (id: string, timestampType: TimestampTypes,
      startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => Promise<SETEvents>> = {

  [CaepEventURIs[CaepEventTypes.AssuranceLevelChange].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => {

      let ret = await generateStandardUserSubjectEvent(CaepEventTypes.AssuranceLevelChange, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
      let event = ret[CaepEventURIs[CaepEventTypes.AssuranceLevelChange].uri]
      event ['change_direction'] = args[0] ? args[0] : DEFAULT_CHANGE_DIRECTION
      event ['current_level'] = args[1] ? args[1] : DEFAULT_LEVEL
      event ['event_timestamp'] = startTimeAsLong
      event ['initiating_entity'] = args[2] ? args[2] : DEFAULT_INITIATING_ENTITY
      event ['previous_level'] = args[3] ? args[3] : DEFAULT_PREVIOUS_LEVEL
      event ['reason_admin'] = { en: args[4] ? args[4] : DEFAULT_REASON_ADMIN}
      event ['reason_user'] = { en: args[5] ? args[5] : DEFAULT_REASON_USER}
      return ret
    },

  [CaepEventURIs[CaepEventTypes.CredentialChange].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => {

      let ret = await generateStandardUserSubjectEvent(CaepEventTypes.CredentialChange, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
      let event = ret[CaepEventURIs[CaepEventTypes.CredentialChange].uri]
      event ['change_type'] = args[0]
      event ['credential_type'] = args[1]
      event ['event_timestamp'] = startTimeAsLong
      event ['fido2_aaguid'] = args[2]
      event ['friendly_name'] = args[3]
      event ['initiating_entity'] = args[4]
      event ['reason_admin'] = { en: args[5] }
      event ['reason_user'] = { en: args[6] }

      return ret
    },

  [CaepEventURIs[CaepEventTypes.DeviceComplianceChange].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(CaepEventTypes.DeviceComplianceChange, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

  [CaepEventURIs[CaepEventTypes.SessionRevoked].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(CaepEventTypes.SessionRevoked, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

  [CaepEventURIs[CaepEventTypes.TokenClaimsChange].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(CaepEventTypes.TokenClaimsChange, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

};
