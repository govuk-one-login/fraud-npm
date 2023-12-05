export enum NotificationEventTypes {
    AccountConcern = 'accountConcern',
    DeviceConcern = 'deviceConcern',
  }
  
  export const NotificationEventKeys: Array<NotificationEventTypes> = Object.keys(NotificationEventTypes) as NotificationEventTypes[];
  
  export const NotificationEventURIs: Record<NotificationEventTypes, string> = {
    [NotificationEventTypes.AccountConcern]: 'https://vocab.account.gov.uk/secevent/v1/notification/accountConcern',
    [NotificationEventTypes.DeviceConcern]: 'https://vocab.account.gov.uk/secevent/v1/notification/deviceConcern',
  }