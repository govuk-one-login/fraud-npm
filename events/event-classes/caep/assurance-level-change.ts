import { CaepEventTypes } from "../../enums/caep-events";
import { BaseEvent } from "../BaseEvent";

export class AssuranceLevelChangeEvent extends BaseEvent {
    readonly eventType: CaepEventTypes = CaepEventTypes.AssuranceLevelChange;
  
  }