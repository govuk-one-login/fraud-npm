import { AllEventURIs, AllEventTypes } from '../enums/events';
import { activityEventMapping } from './activity-maps';
import { caepEventMapping } from './caep-maps';
import { notificationEventMapping } from './notification-maps';
import { riscEventMapping } from './risc-maps';

export const eventMapping: Record<(typeof AllEventURIs)[AllEventTypes], any> = {
  ...notificationEventMapping,
  ...riscEventMapping,
  ...activityEventMapping,
  ...caepEventMapping,
};
