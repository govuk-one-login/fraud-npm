import { CaepEventTypes } from '../../enums/caep-events';
import { TxmaEventNames } from '../../enums/event-names';
import { BaseEvent } from '../BaseEvent';

export class AssuranceLevelChangeEvent extends BaseEvent {
  readonly eventType: CaepEventTypes = CaepEventTypes.AssuranceLevelChange;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.AssuranceLevelChange;
}
