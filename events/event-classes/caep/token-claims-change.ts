import { CaepEventTypes } from "../../enums/caep-events";
import { BaseEvent } from "../BaseEvent";

export class TokenClaimsChange extends BaseEvent {
    readonly eventType: CaepEventTypes = CaepEventTypes.TokenClaimsChange;
  
  }