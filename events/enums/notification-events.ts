import { UriInfo } from './events';

export enum NotificationEventTypes {
  AccountConcern = 'accountConcern',
  AccountBlock = 'accountBlock',
  DeviceConcern = 'deviceConcern',
  CredentialConcern = 'credentialConcern',
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
  [NotificationEventTypes.DeviceConcern]: {
    uri: GOV_UK_SCHEMA_ROOT_NOTIFICATION + 'deviceConcern',
    detailsKey: 'deviceConcern',
  },
  [NotificationEventTypes.CredentialConcern]: {
    uri: GOV_UK_SCHEMA_ROOT_NOTIFICATION + 'credentialConcern',
    detailsKey: 'credentialConcern',
  },
};
