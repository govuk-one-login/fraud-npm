import { SsfSchema } from '../types/ssf';
import { ValidateService } from '../services/validate/validate';
import { Schema } from 'ajv';
import { TxmaEventNames } from '../enums/event-names';
import { ReformatService } from '../services/reformat/reformat';
import { TxmaType } from '../enums/txma';
import { AllEventTypes, AllEventURIs } from '../enums/events';
import { GenerateService } from '../services/generate/generate';

import * as setSchema from '../schemas/setschema.json';
import * as eventDetailsSchema from '../schemas/extensions/event-details.json';
import * as eventMetadataSchema from '../schemas/extensions/metadata.json';

export abstract class BaseEvent {
  readonly setSchema: Schema = setSchema;
  readonly eventDetailsSchema: Schema = eventDetailsSchema;
  readonly eventMetadataSchema: Schema = eventMetadataSchema;
  eventType: AllEventTypes;
  txmaEventName: TxmaEventNames;
  setMessage?: SsfSchema;
  eventMessage: any;
  eventSchema: Schema;
  eventDetailsKey?: string;
  eventMetadataKey?: string;

  constructor(
    eventType: AllEventTypes,
    txmaEventName: TxmaEventNames,
    eventSchema: Schema,
    message?: SsfSchema
  ) {
    this.eventType = eventType;
    this.txmaEventName = txmaEventName;
    this.eventSchema = eventSchema;

    if (message) {
      this.setMessage = message;
      this.eventMessage = this.setMessage?.events[AllEventURIs[this.eventType]];
      this.eventDetailsKey = Object.keys(this.setMessage.events).find((key) =>
        key.includes('eventDetails')
      );
      this.eventMetadataKey = Object.keys(this.setMessage.events).find((key) =>
        key.includes('eventMetadata')
      );
    }
  }

  /**
   * Validate SET against SET schema
   * Validate event against event schema
   */
  async validateEvent(): Promise<void> {
    if (!this.setMessage || !this.eventMessage)
      throw new Error('No Set / Event found');

    const validations: [Schema, unknown][] = [
      [this.setSchema, this.setMessage],
      [this.eventSchema, this.eventMessage],
    ];

    if (this.eventDetailsKey)
      validations.push([
        this.eventDetailsSchema,
        this.setMessage.events[this.eventDetailsKey],
      ]);

    if (this.eventMetadataKey)
      validations.push([
        this.eventMetadataSchema,
        this.setMessage.events[this.eventMetadataKey],
      ]);

    await Promise.all(
      validations.map(async ([schema, message]) =>
        ValidateService.validate(schema, message)
      )
    );
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
