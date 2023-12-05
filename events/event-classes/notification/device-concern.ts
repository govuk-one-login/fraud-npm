import { NotificationEventTypes } from "../../enums/notification-events";
import { BaseEvent } from "../BaseEvent";

export class DeviceConcernEvent extends BaseEvent {
    readonly eventType: NotificationEventTypes = NotificationEventTypes.DeviceConcern;
  
  }