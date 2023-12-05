import { ActivityEventTypes } from "../../enums/activity-events";
import { BaseEvent } from "../BaseEvent";

export class SessionRecoveredEvent extends BaseEvent {
  readonly eventType: ActivityEventTypes = ActivityEventTypes.SessionRecovered;

}
