import { CaepEventTypes } from '../../enums/caep-events';
import { TxmaEventNames } from '../../enums/event-names';
import { BaseEvent } from '../BaseEvent';

export class CredentialChangeEvent extends BaseEvent {
  readonly eventType: CaepEventTypes = CaepEventTypes.CredentialChange;
  readonly txmaEventName: TxmaEventNames = TxmaEventNames.CredentialChange;
}
