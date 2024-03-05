import { SsfSchema } from '../types/ssf';
import { ValidateService } from '../services/validate/validate';
import { Schema } from 'ajv';
import { TxmaEventNames } from '../enums/event-names';
import { AllEventTypes, AllEventURIs } from '../enums/events';
import * as setSchema from '../schemas/set-schema.json';
import * as eventDetailsSchema from '../schemas/extensions/event-details.json';
import * as eventMetadataSchema from '../schemas/extensions/metadata.json';
import { ErrorMessages } from '../enums/errors';

export class BaseEvent {

  readonly setSchema: Schema = setSchema;
  readonly eventDetailsSchema: Schema = eventDetailsSchema;
  readonly eventMetadataSchema: Schema = eventMetadataSchema;
  eventType: AllEventTypes;
  txmaEventName: TxmaEventNames;
  eventMessage: any;
  eventSchema: Schema;
  eventDetailsKey?: string;
  eventMetadataKey?: string;
  setMessage?: SsfSchema;

  constructor(
    eventType: AllEventTypes,
    txmaEventName: TxmaEventNames,
    eventSchema: Schema,
    message?: SsfSchema,
  ) {
    this.eventType = eventType;
    this.txmaEventName = txmaEventName;
    this.eventSchema = eventSchema;

    if (message) {
      this.setMessage = message;
      this.eventMessage = this.setMessage?.events[AllEventURIs[this.eventType].uri];
      this.eventDetailsKey = Object.keys(this.setMessage.events).find((key) =>
        key.includes('eventDetails'),
      );
      this.eventMetadataKey = Object.keys(this.setMessage.events).find((key) =>
        key.includes('eventMetadata'),
      );
    }
  }

  /**
   * Validate the SET against SET schema and the event against event schema. Note that the event is contained
   * within the SET.
   */
  async validateEvent(): Promise<void> {
    if (!this.setMessage || !this.eventMessage)
      throw new Error(ErrorMessages.NoMessage);

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
        ValidateService.validate(schema, message),
      ),
    );
  }
}
