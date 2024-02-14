import { CaepEventTypes, CaepEventURIs } from '../enums/caep-events';
import { AssuranceLevelChangeEvent } from '../event-classes/caep/assurance-level-change';
import { CredentialChangeEvent } from '../event-classes/caep/credential-change';
import { DeviceComplianceChangeEvent } from '../event-classes/caep/device-compliance-change';
import { SessionRevokedEvent } from '../event-classes/caep/session-revoked';
import { TokenClaimsChange } from '../event-classes/caep/token-claims-change';
import { AllEventURIs, TimestampTypes } from '../enums/events';
import { SETEvents } from '../types/ssf';
import {
  addFields,
  addStandardEventFields,
  DEFAULT_CHANGE_DIRECTION,
  DEFAULT_CHANGE_TYPE,
  DEFAULT_CREDENTIAL_TYPE,
  DEFAULT_CURRENT_STATUS,
  DEFAULT_FIDO_AAGUID,
  DEFAULT_FRIENDLY_NAME,
  DEFAULT_INITIATING_ENTITY,
  DEFAULT_ISS,
  DEFAULT_JTI,
  DEFAULT_LEVEL,
  DEFAULT_PREVIOUS_LEVEL,
  DEFAULT_PREVIOUS_STATUS,
  DEFAULT_REASON_ADMIN,
  DEFAULT_REASON_USER,
  DEFAULT_SESSION_ID,
  DEFAULT_SUB,
  DEFAULT_TENANT_ID,
  DEFAULT_TOKEN_FORMAT,
  generateEventMetaDataAndDetails,
  generateStandardUserSubjectEvent,
  getNameValuePairList,
  NameValuePair,
} from './event-mapping';

export const caepEventMapping: Record<string, any> = {
  [CaepEventURIs[CaepEventTypes.AssuranceLevelChange].uri]: AssuranceLevelChangeEvent,
  [CaepEventURIs[CaepEventTypes.CredentialChange].uri]: CredentialChangeEvent,
  [CaepEventURIs[CaepEventTypes.DeviceComplianceChange].uri]: DeviceComplianceChangeEvent,
  [CaepEventURIs[CaepEventTypes.SessionRevoked].uri]: SessionRevokedEvent,
  [CaepEventURIs[CaepEventTypes.TokenClaimsChange].uri]: TokenClaimsChange,
};

async function generateCaepDeviceSubjectEvent(eventType: CaepEventTypes, deviceIss: string, deviceSub: string, tenantId: string,
                                                  timestampType: TimestampTypes,
                                                  startTime: number, endTime: number): Promise<SETEvents> {

  let metadataAndDetails = await generateEventMetaDataAndDetails(eventType, timestampType, startTime, endTime)

  return {
    ...metadataAndDetails,

    [AllEventURIs[eventType].uri]: {
      subject: {
        device: {
          format: 'iss_sub',
          iss: deviceIss,
          sub: deviceSub,
        },
        tenant: {
          format: 'opaque',
          id: tenantId
        }
      }
    }
  }
}

async function generateCaepSessionSubjectEvent(eventType: CaepEventTypes, sessionId: string,
                                                userIssuer: string, userSub: string, tenantId: string,
                                                timestampType: TimestampTypes,
                                                startTime: number, endTime: number): Promise<SETEvents> {

  let metadataAndDetails = await generateEventMetaDataAndDetails(eventType, timestampType, startTime, endTime)

  return {
    ...metadataAndDetails,

    [AllEventURIs[eventType].uri]: {
      subject: {
        session: {
          format: 'opaque',
          id: sessionId,
        },
        user: {
          format: 'iss_sub',
          iss: userIssuer,
          sub: userSub,
        },
        tenant: {
          format: 'opaque',
          id: tenantId
        }
      }
    },
  }
}

async function generateCaepTokenSubjectEvent(eventType: CaepEventTypes, tokenFormat: string, tokenIssuer: string,
    jti: string, timestampType: TimestampTypes, startTime: number, endTime: number): Promise<SETEvents> {

  let metadataAndDetails = await generateEventMetaDataAndDetails(eventType, timestampType, startTime, endTime)

  return {
    ...metadataAndDetails,
    [AllEventURIs[eventType].uri]: {
      subject: {
        format: tokenFormat,
        iss: tokenIssuer,
        jti: jti
      }
    }
  }
}

export const caepPopulatedEventMapping: Record<string, (id: string, timestampType: TimestampTypes,
      startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => Promise<SETEvents>> = {

  [CaepEventURIs[CaepEventTypes.AssuranceLevelChange].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => {

      let ret = await generateStandardUserSubjectEvent(CaepEventTypes.AssuranceLevelChange, id, timestampType,
        startTimeAsLong, endTimeAsLong)

      let event= ret[CaepEventURIs[CaepEventTypes.AssuranceLevelChange].uri]

      // add standard fields
      addStandardEventFields(event, startTimeAsLong, args[0] ?? DEFAULT_INITIATING_ENTITY,
        args[1] ?? DEFAULT_REASON_ADMIN, args[2] ?? DEFAULT_REASON_USER)

      // add message-specific fields
      event ['change_direction'] = args[3] ?? DEFAULT_CHANGE_DIRECTION
      event ['current_level'] = args[4] ?? DEFAULT_LEVEL
      event ['previous_level'] = args[5] ?? DEFAULT_PREVIOUS_LEVEL

      return ret
    },

  [CaepEventURIs[CaepEventTypes.CredentialChange].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null)[]) => {

      let ret = await generateStandardUserSubjectEvent(CaepEventTypes.CredentialChange, id, timestampType,
        startTimeAsLong, endTimeAsLong)
      let event = ret[CaepEventURIs[CaepEventTypes.CredentialChange].uri]

      addStandardEventFields(event, startTimeAsLong, args[0] ?? DEFAULT_INITIATING_ENTITY,
        args[1] ?? DEFAULT_REASON_ADMIN, args[2] ?? DEFAULT_REASON_USER)

      event ['change_type'] = args[3] ?? DEFAULT_CHANGE_TYPE
      event ['credential_type'] = args[4] ?? DEFAULT_CREDENTIAL_TYPE
      event ['fido2_aaguid'] = args[5] ?? DEFAULT_FIDO_AAGUID
      event ['friendly_name'] = args[6] ?? DEFAULT_FRIENDLY_NAME

      return ret
    },

  [CaepEventURIs[CaepEventTypes.DeviceComplianceChange].uri] :
    async (_id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => {

      let ret = await generateCaepDeviceSubjectEvent(CaepEventTypes.DeviceComplianceChange,
        args[0] ?? DEFAULT_ISS, args[1] ?? DEFAULT_SUB,
         args[2] ?? DEFAULT_TENANT_ID, timestampType, startTimeAsLong, endTimeAsLong)

      let event = ret[CaepEventURIs[CaepEventTypes.DeviceComplianceChange].uri]

      addStandardEventFields(event, startTimeAsLong, args[3] ?? DEFAULT_INITIATING_ENTITY,
        args[4] ?? DEFAULT_REASON_ADMIN, args[5] ?? DEFAULT_REASON_USER)

      event ['current_status'] = args[6] ?? DEFAULT_CURRENT_STATUS
      event ['previous_status'] = args[7] ?? DEFAULT_PREVIOUS_STATUS

      return ret
    },

  [CaepEventURIs[CaepEventTypes.SessionRevoked].uri] :
    async (_id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => {

      let ret = await generateCaepSessionSubjectEvent(CaepEventTypes.SessionRevoked,
      args[0] ?? DEFAULT_SESSION_ID, args[1] ?? DEFAULT_ISS,
        args[2] ?? DEFAULT_SUB, args[3] ?? DEFAULT_TENANT_ID,
        timestampType, startTimeAsLong, endTimeAsLong)

      let event = ret[CaepEventURIs[CaepEventTypes.SessionRevoked].uri]

      addStandardEventFields(event, startTimeAsLong, args[4] ?? DEFAULT_INITIATING_ENTITY,
        args[5] ?? DEFAULT_REASON_ADMIN, args[6] ?? DEFAULT_REASON_USER)

      return ret
    },

  [CaepEventURIs[CaepEventTypes.TokenClaimsChange].uri] :
    async (_id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => {

      //
      // args[0] is a comma-separated list of name value pairs in the format:
      // a=b;c=d;e=f
      //
      const nameValuePairList: NameValuePair[] = getNameValuePairList(args[0] ?? '')
      let claims: any = { }
      addFields(claims, nameValuePairList)

      let ret =  await generateCaepTokenSubjectEvent(CaepEventTypes.TokenClaimsChange,
        args[1] ?? DEFAULT_TOKEN_FORMAT,
        args[2] ?? DEFAULT_ISS, args[3] ?? DEFAULT_JTI, timestampType, startTimeAsLong, endTimeAsLong)

      let event = ret[CaepEventURIs[CaepEventTypes.TokenClaimsChange].uri]

      addStandardEventFields(event, startTimeAsLong, args[4] ?? DEFAULT_INITIATING_ENTITY,
        args[5] ?? DEFAULT_REASON_ADMIN, args[6] ?? DEFAULT_REASON_USER)

      event ['claims'] = claims

      return ret
    },

};
