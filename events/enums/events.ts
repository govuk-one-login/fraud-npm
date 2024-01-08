import { ActivityEventURIs, ActivityEventTypes } from './activity-events';
import { CaepEventURIs, CaepEventTypes } from './caep-events';
import {
  NotificationEventURIs,
  NotificationEventTypes,
} from './notification-events';
import { RiscEventURIs, RiscEventTypes } from './risc-events';

export const AllEventURIs: Record<AllEventTypes, string> = {
  ...RiscEventURIs,
  ...CaepEventURIs,
  ...NotificationEventURIs,
  ...ActivityEventURIs,
};

export type AllEventTypes =
  | NotificationEventTypes
  | RiscEventTypes
  | CaepEventTypes
  | ActivityEventTypes;

export const EventTypes: Record<string, AllEventTypes> = {
  ...NotificationEventTypes,
  ...RiscEventTypes,
  ...CaepEventTypes,
  ...ActivityEventTypes,
};

export enum IdentifierTypes {
  UserID = 'userId',
  DeviceID = 'deviceId',
  GroupID = 'groupId',
}
