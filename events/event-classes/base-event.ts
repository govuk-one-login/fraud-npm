import { SsfSchema } from '../types/ssf';
import { ValidateService } from '../services/validate/validate';
import * as setSchema from '../schemas/setschema.json';
import { Schema } from 'ajv';
import { TxmaEventNames } from '../enums/event-names';
import { ReformatService } from '../services/reformat/reformat';
import { TxmaType } from '../enums/txma';
import { AllEventTypes, AllEventURIs } from '../enums/events';
import { GenerateService } from '../services/generate/generate';

export abstract class BaseEvent {
  readonly setSchema: Schema = setSchema;
  eventType: AllEventTypes;
  txmaEventName: TxmaEventNames;
  setMessage?: SsfSchema;
  eventMessage: any;
  eventSchema: Schema;

  constructor(
    eventType: AllEventTypes,
    txmaEventName: TxmaEventNames,
    eventSchema: Schema,
    message?: SsfSchema
  ) {
    this.eventType = eventType;
    this.txmaEventName = txmaEventName;
    this.eventSchema = eventSchema;
    this.setMessage = message;
    this.eventMessage = this.setMessage?.events[AllEventURIs[this.eventType]];
  }

  /**
   * Validate SET against SET schema
   * Validate event against event schema
   */
  async validateEvent(): Promise<void> {
    if (!this.setMessage || !this.eventMessage)
      throw new Error('No Set / Event found');

    await Promise.all([
      ValidateService.validate(setSchema, this.setMessage),
      ValidateService.validate(this.eventSchema, this.eventMessage),
    ]);
  }

  /**
   * Map the Inbound event to the TxMA message schema and validate required fields
   */
  async reformatMessage(): Promise<TxmaType> {
    if (!this.setMessage || !this.eventMessage)
      throw new Error('No Set / Event found');

    const txmaMessage: TxmaType = await ReformatService.reformatForTxma(
      this.txmaEventName,
      this.setMessage
    );

    // Add in Txma Schema
    await ValidateService.validate({}, txmaMessage);
    return txmaMessage;
  }

  async generateSET(): Promise<SsfSchema> {
    return GenerateService.generateSET();
  }
}
