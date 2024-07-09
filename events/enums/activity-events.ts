import { UriInfo } from './events';

export enum ActivityEventTypes {
  SessionRecovered = 'sessionRecovered',
}

export const ActivityEventKeys: Array<ActivityEventTypes> = Object.keys(
  ActivityEventTypes
) as ActivityEventTypes[];

const GOV_UK_SCHEMA_ROOT_ACTIVITY =
  'https://vocab.account.gov.uk/secevent/v1/activity/';

export const ActivityEventURIs: Record<ActivityEventTypes, UriInfo> = {
  [ActivityEventTypes.SessionRecovered]: {
    uri: GOV_UK_SCHEMA_ROOT_ACTIVITY + 'sessionRecovered',
    detailsKey: 'sessionRecovered',
  },
};
