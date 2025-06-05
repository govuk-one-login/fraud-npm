import { UriInfo } from './events';

export enum NotificationEventTypes {
  AccountConcern = 'accountConcern',
  AccountBlock = 'accountBlock',
}

export const NotificationEventKeys: Array<NotificationEventTypes> = Object.keys(
  NotificationEventTypes
) as NotificationEventTypes[];

const GOV_UK_SCHEMA_ROOT_NOTIFICATION =
  'https://vocab.account.gov.uk/secevent/v1/notification/';

export const NotificationEventURIs: Record<NotificationEventTypes, UriInfo> = {
  [NotificationEventTypes.AccountConcern]: {
    uri: GOV_UK_SCHEMA_ROOT_NOTIFICATION + 'accountConcern',
    detailsKey: 'accountConcern',
  },
  [NotificationEventTypes.AccountBlock]: {
    uri: GOV_UK_SCHEMA_ROOT_NOTIFICATION + 'accountBlock',
    detailsKey: 'accountConcern',
  },
};
