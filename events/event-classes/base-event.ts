import { AllEventTypes, AllEventURIs } from '../event-mapping/event-mapping';
import { SsfSchema } from '../types/ssf';
import { ValidateService } from '../services/validate/validate';
import * as setSchema from '../schemas/setschema.json';
import { Schema } from 'ajv';
import { TxmaEventNames } from '../enums/event-names';
import { ReformatService } from '../services/reformat/reformat';
import { TxmaType } from '../enums/txma';

export class BaseEvent {
  readonly setSchema: Schema = setSchema;
  eventType: AllEventTypes;
  txmaEventName: TxmaEventNames;
  setMessage: SsfSchema;
  eventMessage: any;
  eventSchema: Schema;

  constructor(
    message: SsfSchema,
    eventType: AllEventTypes,
    txmaEventName: TxmaEventNames,
    eventSchema: Schema
  ) {
    this.eventType = eventType;
    this.txmaEventName = txmaEventName;
    this.eventSchema = eventSchema;
    this.setMessage = message;
    this.eventMessage = this.setMessage.events[AllEventURIs[this.eventType]];
  }

  /**
   * Validate SET against SET schema
   * Validate event against event schema
   */
  async validateEvent(): Promise<void> {
    await Promise.all([
      ValidateService.validate(setSchema, this.setMessage),
      ValidateService.validate(this.eventSchema, this.eventMessage),
    ]);
  }

  /**
   * Map the Inbound event to the TxMA message schema and validate required fields
   */
  async reformatMessage(): Promise<TxmaType> {
    const txmaMessage: TxmaType = await ReformatService.reformatForTxma(
      this.txmaEventName,
      this.setMessage
    );

    // Add in Txma Schema
    await ValidateService.validate({}, txmaMessage);

    return txmaMessage;
  }
}
