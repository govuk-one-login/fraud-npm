export enum ActivityEventTypes {
  SessionRecovered = 'sessionRecovered',
}

export const ActivityEventKeys: Array<ActivityEventTypes> = Object.keys(
  ActivityEventTypes
) as ActivityEventTypes[];

const GOV_UK_SCHEMA_ROOT_ACTIVITY ='https://vocab.account.gov.uk/secevent/v1/activity/'

export const ActivityEventURIs: Record<ActivityEventTypes, string> = {
  [ActivityEventTypes.SessionRecovered]: GOV_UK_SCHEMA_ROOT_ACTIVITY + 'sessionRecovered',
};
