import { CaepEventTypes } from '../../enums/caep-events';
import { TxmaEventNames } from '../../enums/event-names';
import { BaseEvent } from '../base-event';

import * as eventSchema from '../../schemas/caep/device-compliance-change.json';
import { SsfSchema } from '../../types/ssf';

export class DeviceComplianceChangeEvent extends BaseEvent {
  constructor(message?: SsfSchema) {
    super(
      CaepEventTypes.DeviceComplianceChange,
      TxmaEventNames.DeviceComplianceChange,
      eventSchema,
      message
    );
  }
}
