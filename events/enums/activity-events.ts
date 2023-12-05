export enum ActivityEventTypes {
  SessionRecovered = 'sessionRecovered',
}

export const ActivityEventKeys: Array<ActivityEventTypes> = Object.keys(
  ActivityEventTypes
) as ActivityEventTypes[];

export const ActivityEventURIs: Record<ActivityEventTypes, string> = {
  [ActivityEventTypes.SessionRecovered]:
    'https://vocab.account.gov.uk/secevent/v1/activity/sessionRecovered',
};
