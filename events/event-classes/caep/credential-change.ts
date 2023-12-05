import { CaepEventTypes } from '../../enums/caep-events';
import { BaseEvent } from '../BaseEvent';

export class CredentialChangeEvent extends BaseEvent {
  readonly eventType: CaepEventTypes = CaepEventTypes.CredentialChange;
}
