import { ActivityEventURIs, ActivityEventTypes } from './activity-events';
import {
  NotificationEventURIs,
  NotificationEventTypes,
} from './notification-events';
import { RiscEventURIs, RiscEventTypes } from './risc-events';

export const AllEventURIs: Record<AllEventTypes, UriInfo> = {
  ...RiscEventURIs,
  ...NotificationEventURIs,
  ...ActivityEventURIs,
};

export type AllEventTypes =
  | NotificationEventTypes
  | RiscEventTypes
  | ActivityEventTypes;

export const EventTypes: Record<string, AllEventTypes> = {
  ...NotificationEventTypes,
  ...RiscEventTypes,
  ...ActivityEventTypes,
};

export enum IdentifierTypes {
  UserID = 'userId',
  DeviceID = 'deviceId',
  GroupID = 'groupId',
}

export enum TimestampTypes {
  timeStamp,
  timeFrame,
}

export type UriInfo = {
  uri: string;
  detailsKey: string;
};
