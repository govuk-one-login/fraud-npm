import {
  ActivityEventTypes,
  ActivityEventURIs,
} from '../enums/activity-events';
import { CaepEventTypes, CaepEventURIs } from '../enums/caep-events';
import {
  NotificationEventTypes,
  NotificationEventURIs,
} from '../enums/notification-events';
import { RiscEventTypes, RiscEventURIs } from '../enums/risc-events';
import { BaseEvent } from '../event-classes/BaseEvent';
import { activityEventMapping } from './activity-maps';
import { notificationEventMapping } from './notification-maps';
import { riscEventMapping } from './risc-maps';

const AllEventURIs = {
  ...RiscEventURIs,
  ...CaepEventURIs,
  ...NotificationEventURIs,
  ...ActivityEventURIs,
};

type AllEventTypes = NotificationEventTypes &
  RiscEventTypes &
  CaepEventTypes &
  ActivityEventTypes;

export const eventMapping: Record<
  (typeof AllEventURIs)[AllEventTypes],
  BaseEvent
> = {
  ...notificationEventMapping,
  ...riscEventMapping,
  ...activityEventMapping,
};
