import { CaepEventTypes } from '../../enums/caep-events';
import { TxmaEventNames } from '../../enums/event-names';
import { BaseEvent } from '../BaseEvent';

export class TokenClaimsChange extends BaseEvent {
  readonly eventType: CaepEventTypes = CaepEventTypes.TokenClaimsChange;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.TokenClaimsChange;
}
