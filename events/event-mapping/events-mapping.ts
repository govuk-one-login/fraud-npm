import { AllEventTypes, AllEventURIs, TimestampTypes } from '../enums/events';
import {
  notificationEventsMapping,
  notificationPopulatedEventsMapping,
} from './notification-maps';
import { riscEventsMapping, riscPopulatedEventsMapping } from './risc-maps';
import { EventStructure, SETEvents } from '../types/ssf';

export const EVENT_METADATA_URI =
  'https://vocab.account.gov.uk/secevent/v1/eventMetadata';
export const EVENT_DETAILS_URI = 'https://vocab.account.gov.uk/secevent/v1/';
export const DEFAULT_LOCATION = 'GB';

export const DEFAULT_URI =
  'urn:fdc:gov.uk:2022:56P4CMsGh_02YOlWpd8PAOI-2sVlB2nsNU7mcLZYhYw=';

export const DEFAULT_CHANGE_DIRECTION = 'increase';
export const DEFAULT_LEVEL = 'nist-aal1';
export const DEFAULT_PREVIOUS_LEVEL = 'nist-aal2';
export const DEFAULT_CHANGE_TYPE = 'create';
export const DEFAULT_CREDENTIAL_TYPE = 'password';
export const DEFAULT_FIDO_AAGUID = 'accced6a-63f5-490a-9eea-e59bc1896cfc';
export const DEFAULT_FRIENDLY_NAME = "Jane's USB authenticator";
export const DEFAULT_INITIATING_ENTITY = 'admin';
export const DEFAULT_REASON_ADMIN = 'User self-enrollment';
export const DEFAULT_REASON_USER = 'User self-enrollment';
export const DEFAULT_CURRENT_STATUS = 'compliant';
export const DEFAULT_PREVIOUS_STATUS = 'non-compliant';
export const DEFAULT_ISS = 'https://idp.example.com/123456789/';
export const DEFAULT_SUB = 'e9297990-14d2-42ec-a4a9-4036db86509a';
export const DEFAULT_TENANT_ID = '123456789';
export const DEFAULT_SESSION_ID = 'dMTlD|1600802906337.16|16008.16';
export const DEFAULT_PREVIOUS_SESSION_ID = 'dMTlD|1800903006337.16|16009.16';
export const DEFAULT_JTI = '61t6e20zdo3px56gepu8rzlsp4c1dpc0fx7';
export const DEFAULT_TOKEN_FORMAT = 'jwt_id';
export const DEFAULT_EMAIL = 'ray@evans.com';
export const DEFAULT_EMAIL_2 = 'bertie@wooster.com';
export const DEFAULT_PHONE = '01283 444 555';
export const DEFAULT_PHONE_2 = '01234 222 333';
export const DEFAULT_ACCOUNT_DISABLED_REASON = 'User suspected of fraud';
export const DEFAULT_RATIONALE_CODE =
  'a-non-clashing-code-to-be-agreed-between-producer-and-consumer';

export interface NameValuePair {
  name: string;
  value: string;
}

export function getNameValuePairList(nameValuePairs: string): NameValuePair[] {
  const nameValuePairListAsString = nameValuePairs.split(';');
  let nameValuePairList: NameValuePair[] = [];

  if (nameValuePairListAsString) {
    for (const nameValuePair of nameValuePairListAsString) {
      const parts = nameValuePair.split('=');
      if (parts?.length === 2) {
        const newPair: NameValuePair = { name: parts[0], value: parts[1] };
        nameValuePairList.push(newPair);
      }
    }
  }
  return nameValuePairList;
}

export function addFields(
  object: { [key: string]: any },
  properties: NameValuePair[]
) {
  for (const property of properties) {
    object[property.name] = property.value;
  }
}

export function addStandardEventFields(
  event: EventStructure,
  timeStampInMillis: number,
  initiatingEntity: string,
  reasonAdmin: string,
  reasonUser: string
) {
  event['event_timestamp'] = Math.round(timeStampInMillis / 1000);
  event['initiating_entity'] = initiatingEntity;
  event['reason_admin'] = { en: reasonAdmin };
  event['reason_user'] = { en: reasonUser };
}

export async function generateMetaDataAndDetailsEvents(
  eventType: AllEventTypes,
  timestampType: TimestampTypes,
  startTimeInMillis: number,
  endTimeInMillis: number
): Promise<SETEvents> {
  let timeFrame: {};
  if (startTimeInMillis == 0 && endTimeInMillis != 0) {
    timeFrame = { end_time: endTimeInMillis };
  } else if (startTimeInMillis !== 0 && endTimeInMillis == 0) {
    timeFrame = { start_time: startTimeInMillis };
  } else {
    timeFrame = { start_time: startTimeInMillis, end_time: endTimeInMillis };
  }

  return {
    [EVENT_METADATA_URI]: {
      ...(timestampType === TimestampTypes.timeStamp
        ? { event_timestamp_ms: startTimeInMillis }
        : {
            event_timeframe_ms: timeFrame,
          }),
    },

    [EVENT_DETAILS_URI + AllEventURIs[eventType].detailsKey + '/eventDetails']:
      {
        location: DEFAULT_LOCATION,
      },
  };
}

export async function generateStandardUserSubjectEvents(
  eventType: AllEventTypes,
  id: string,
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
        format: 'uri',
        uri: id,
      },
    },
    ...metadataAndDetails,
  };
}

export const eventsMapping: Record<string, any> = {
  ...notificationEventsMapping,
  ...riscEventsMapping,
};

export const populatedEventsMapping: Record<
  string,
  (
    id: string,
    startTimeInMillis: number,
    endTimeInMillis: number,
    ...args: (string | null)[]
  ) => Promise<SETEvents>
> = {
  ...notificationPopulatedEventsMapping,
  ...riscPopulatedEventsMapping,
};
