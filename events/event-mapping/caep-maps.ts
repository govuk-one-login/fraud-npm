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
  generateMetaDataAndDetailsEvents,
  generateStandardUserSubjectEvents,
  getNameValuePairList,
  NameValuePair,
} from './events-mapping';

export const caepEventMapping: Record<string, any> = {
  [CaepEventURIs[CaepEventTypes.AssuranceLevelChange].uri]:
    AssuranceLevelChangeEvent,
  [CaepEventURIs[CaepEventTypes.CredentialChange].uri]: CredentialChangeEvent,
  [CaepEventURIs[CaepEventTypes.DeviceComplianceChange].uri]:
    DeviceComplianceChangeEvent,
  [CaepEventURIs[CaepEventTypes.SessionRevoked].uri]: SessionRevokedEvent,
  [CaepEventURIs[CaepEventTypes.TokenClaimsChange].uri]: TokenClaimsChange,
};

async function generateCaepDeviceSubjectEvents(
  eventType: CaepEventTypes,
  deviceIss: string,
  deviceSub: string,
  tenantId: string,
  timestampType: TimestampTypes,
  startTimeInMillis: number,
  endTimeInMillis: number
): Promise<SETEvents> {
  let metadataAndDetails = await generateMetaDataAndDetailsEvents(
    eventType,
    timestampType,
    startTimeInMillis,
    endTimeInMillis
  );

  return {
    [AllEventURIs[eventType].uri]: {
      subject: {
        device: {
          format: 'iss_sub',
          iss: deviceIss,
          sub: deviceSub,
        },
        tenant: {
          format: 'opaque',
          id: tenantId,
        },
      },
    },
    ...metadataAndDetails,
  };
}

async function generateCaepSessionSubjectEvents(
  eventType: CaepEventTypes,
  sessionId: string,
  userIssuer: string,
  userSub: string,
  tenantId: string,
  timestampType: TimestampTypes,
  startTimeInMillis: number,
  endTimeInMillis: number
): Promise<SETEvents> {
  let metadataAndDetails = await generateMetaDataAndDetailsEvents(
    eventType,
    timestampType,
    startTimeInMillis,
    endTimeInMillis
  );

  return {
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
          id: tenantId,
        },
      },
    },
    ...metadataAndDetails,
  };
}

async function generateCaepTokenSubjectEvents(
  eventType: CaepEventTypes,
  tokenFormat: string,
  tokenIssuer: string,
  jti: string,
  timestampType: TimestampTypes,
  startTimeInMillis: number,
  endTimeInMillis: number
): Promise<SETEvents> {
  let metadataAndDetails = await generateMetaDataAndDetailsEvents(
    eventType,
    timestampType,
    startTimeInMillis,
    endTimeInMillis
  );

  return {
    [AllEventURIs[eventType].uri]: {
      subject: {
        format: tokenFormat,
        iss: tokenIssuer,
        jti: jti,
      },
    },
    ...metadataAndDetails,
  };
}

export const caepPopulatedEventsMapping: Record<
  string,
  (
    id: string,
    startTimeInMillis: number,
    endTimeInMillis: number,
    ...args: (string | null)[]
  ) => Promise<SETEvents>
> = {
  [CaepEventURIs[CaepEventTypes.AssuranceLevelChange].uri]: async (
    id: string,
    startTimeAsLong: number,
    endTimeAsLong: number,
    ...args: (string | null)[]
  ) => {
    let userSubjectEvents = await generateStandardUserSubjectEvents(
      CaepEventTypes.AssuranceLevelChange,
      id,
      TimestampTypes.timeStamp,
      startTimeAsLong,
      endTimeAsLong
    );

    let event =
      userSubjectEvents[CaepEventURIs[CaepEventTypes.AssuranceLevelChange].uri];

    // add standard fields
    addStandardEventFields(
      event,
      startTimeAsLong,
      args[0] ?? DEFAULT_INITIATING_ENTITY,
      args[1] ?? DEFAULT_REASON_ADMIN,
      args[2] ?? DEFAULT_REASON_USER
    );

    // add message-specific fields
    event['change_direction'] = args[3] ?? DEFAULT_CHANGE_DIRECTION;
    event['current_level'] = args[4] ?? DEFAULT_LEVEL;
    event['previous_level'] = args[5] ?? DEFAULT_PREVIOUS_LEVEL;

    return userSubjectEvents;
  },

  [CaepEventURIs[CaepEventTypes.CredentialChange].uri]: async (
    id: string,
    startTimeInMillis: number,
    endTimeInMillis: number,
    ...args: (string | null)[]
  ) => {
    let userSubjectEvents = await generateStandardUserSubjectEvents(
      CaepEventTypes.CredentialChange,
      id,
      TimestampTypes.timeStamp,
      startTimeInMillis,
      endTimeInMillis
    );
    let event =
      userSubjectEvents[CaepEventURIs[CaepEventTypes.CredentialChange].uri];

    addStandardEventFields(
      event,
      startTimeInMillis,
      args[0] ?? DEFAULT_INITIATING_ENTITY,
      args[1] ?? DEFAULT_REASON_ADMIN,
      args[2] ?? DEFAULT_REASON_USER
    );

    event['change_type'] = args[3] ?? DEFAULT_CHANGE_TYPE;
    event['credential_type'] = args[4] ?? DEFAULT_CREDENTIAL_TYPE;
    event['fido2_aaguid'] = args[5] ?? DEFAULT_FIDO_AAGUID;
    event['friendly_name'] = args[6] ?? DEFAULT_FRIENDLY_NAME;

    return userSubjectEvents;
  },

  [CaepEventURIs[CaepEventTypes.DeviceComplianceChange].uri]: async (
    _id: string,
    startTimeInMillis: number,
    endTimeInMillis: number,
    ...args: (string | null)[]
  ) => {
    let events = await generateCaepDeviceSubjectEvents(
      CaepEventTypes.DeviceComplianceChange,
      args[0] ?? DEFAULT_ISS,
      args[1] ?? DEFAULT_SUB,
      args[2] ?? DEFAULT_TENANT_ID,
      TimestampTypes.timeStamp,
      startTimeInMillis,
      endTimeInMillis
    );

    let event =
      events[CaepEventURIs[CaepEventTypes.DeviceComplianceChange].uri];

    addStandardEventFields(
      event,
      startTimeInMillis,
      args[3] ?? DEFAULT_INITIATING_ENTITY,
      args[4] ?? DEFAULT_REASON_ADMIN,
      args[5] ?? DEFAULT_REASON_USER
    );

    event['current_status'] = args[6] ?? DEFAULT_CURRENT_STATUS;
    event['previous_status'] = args[7] ?? DEFAULT_PREVIOUS_STATUS;

    return events;
  },

  [CaepEventURIs[CaepEventTypes.SessionRevoked].uri]: async (
    _id: string,
    startTimeInMillis: number,
    endTimeInMillis: number,
    ...args: (string | null)[]
  ) => {
    let events = await generateCaepSessionSubjectEvents(
      CaepEventTypes.SessionRevoked,
      args[0] ?? DEFAULT_SESSION_ID,
      args[1] ?? DEFAULT_ISS,
      args[2] ?? DEFAULT_SUB,
      args[3] ?? DEFAULT_TENANT_ID,
      TimestampTypes.timeStamp,
      startTimeInMillis,
      endTimeInMillis
    );

    let event = events[CaepEventURIs[CaepEventTypes.SessionRevoked].uri];

    addStandardEventFields(
      event,
      startTimeInMillis,
      args[4] ?? DEFAULT_INITIATING_ENTITY,
      args[5] ?? DEFAULT_REASON_ADMIN,
      args[6] ?? DEFAULT_REASON_USER
    );

    return events;
  },

  [CaepEventURIs[CaepEventTypes.TokenClaimsChange].uri]: async (
    _id: string,
    startTimeInMillis: number,
    endTimeInMillis: number,
    ...args: (string | null)[]
  ) => {
    //
    // args[0] is a comma-separated list of name value pairs in the format:
    // a=b;c=d;e=f
    //
    const nameValuePairList: NameValuePair[] = getNameValuePairList(
      args[0] ?? ''
    );
    let claims: any = {};
    addFields(claims, nameValuePairList);

    let events = await generateCaepTokenSubjectEvents(
      CaepEventTypes.TokenClaimsChange,
      args[1] ?? DEFAULT_TOKEN_FORMAT,
      args[2] ?? DEFAULT_ISS,
      args[3] ?? DEFAULT_JTI,
      TimestampTypes.timeStamp,
      startTimeInMillis,
      endTimeInMillis
    );

    let event = events[CaepEventURIs[CaepEventTypes.TokenClaimsChange].uri];

    addStandardEventFields(
      event,
      startTimeInMillis,
      args[4] ?? DEFAULT_INITIATING_ENTITY,
      args[5] ?? DEFAULT_REASON_ADMIN,
      args[6] ?? DEFAULT_REASON_USER
    );

    event['claims'] = claims;

    return events;
  },
};
