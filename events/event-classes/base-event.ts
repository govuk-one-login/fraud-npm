import { SETEvents, SsfSchema } from '../types/ssf';
import { ValidateService } from '../services/validate/validate';
import { Schema } from 'ajv';
import { TxmaEventNames } from '../enums/event-names';
import { AllEventTypes, AllEventURIs, IdentifierTypes } from '../enums/events';
import * as setSchema from '../schemas/set-schema.json';
import * as eventDetailsSchema from '../schemas/extensions/event-details.json';
import * as eventMetadataSchema from '../schemas/extensions/metadata.json';
import { ErrorMessages } from '../enums/errors';
import { BaseSET } from './base-set';

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
        ValidateService.validate(schema, message)
      )
    );
  }

  async generateSET(
    idType: IdentifierTypes,
    id: string,
    issuer: string
  ): Promise<SsfSchema> {
    this.setMessage = new BaseSET(issuer);
    this.setMessage.events = {
      ...(await this.generateEvent(idType, id)),
    };
    return this.setMessage;
  }

  async generateEvent(idType: IdentifierTypes, id: string): Promise<SETEvents> {
    return {
      [AllEventURIs[this.eventType]]: {
        subject: {
          ...(idType === IdentifierTypes.UserID
            ? { format: 'uri', uri: id }
            : {
                [idType === IdentifierTypes.DeviceID ? 'device' : 'group']: {
                  format: 'opaque',
                  id,
                },
              }),
        },
      },
    };
  }
}
