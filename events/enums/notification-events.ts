export enum NotificationEventTypes {
  AccountConcern = 'accountConcern',
  DeviceConcern = 'deviceConcern',
}

export const NotificationEventKeys: Array<NotificationEventTypes> = Object.keys(
  NotificationEventTypes
) as NotificationEventTypes[];

const GOV_UK_SCHEMA_ROOT_NOTIFICATION ='https://vocab.account.gov.uk/secevent/v1/notification/'

export const NotificationEventURIs: Record<NotificationEventTypes, string> = {
  [NotificationEventTypes.AccountConcern]: GOV_UK_SCHEMA_ROOT_NOTIFICATION + 'accountConcern',
  [NotificationEventTypes.DeviceConcern]: GOV_UK_SCHEMA_ROOT_NOTIFICATION + 'deviceConcern',
};
