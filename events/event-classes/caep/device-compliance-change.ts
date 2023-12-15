import { CaepEventTypes } from '../../enums/caep-events';
import { TxmaEventNames } from '../../enums/event-names';
import { BaseEvent } from '../BaseEvent';

export class DeviceComplianceChangeEvent extends BaseEvent {
  readonly eventType: CaepEventTypes = CaepEventTypes.DeviceComplianceChange;
  readonly txmaEventName: TxmaEventNames =
    TxmaEventNames.DeviceComplianceChange;
}
