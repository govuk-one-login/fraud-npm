import { CaepEventTypes } from '../../enums/caep-events';
import { BaseEvent } from '../BaseEvent';

export class DeviceComplianceChangeEvent extends BaseEvent {
  readonly eventType: CaepEventTypes = CaepEventTypes.DeviceComplianceChange;
}
