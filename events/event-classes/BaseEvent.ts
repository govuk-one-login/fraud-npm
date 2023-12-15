import { AllEventTypes, AllEventURIs } from '../event-mapping/event-mapping';
import { SsfSchema } from '../types/ssf';
import { ValidateService } from '../services/validate/validate';
import * as setSchema from '../../events/schemas/setschema.json';
import { Schema } from 'ajv';
import { TxmaEventNames } from '../enums/event-names';

export class BaseEvent {
  readonly setSchema: Schema = setSchema;
  eventType: AllEventTypes;
  txmaEventName: TxmaEventNames;
  setMessage: SsfSchema;
  eventMessage: any;
  eventSchema: Schema;

  constructor(message: SsfSchema) {
    this.setMessage = message;
    this.eventMessage = this.setMessage.events[AllEventURIs[this.eventType]];
  }

  async validateEvent(): Promise<void> {
    await Promise.all([
      ValidateService.validate(setSchema, this.setMessage),
      ValidateService.validate(this.eventSchema, this.eventMessage),
    ]);
  }
}
