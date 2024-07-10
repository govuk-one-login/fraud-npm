import {
  EVENT_DETAILS_URI,
  EVENT_METADATA_URI,
  generateStandardUserSubjectEvents,
} from './events-mapping';
import { AllEventTypes, AllEventURIs, TimestampTypes } from '../enums/events';
import { ActivityEventTypes } from '../enums/activity-events';
import { Schema } from 'ajv';
import util from 'util';
import { ValidateService } from '../services/validate/validate';
import * as metadataSchema from '../schemas/extensions/metadata.json';
import * as detailsSchema from '../schemas/extensions/event-details.json';
import { SETEvents } from '../types/ssf';

export type TestInfo = {
  type: AllEventTypes;
  schema: Schema;
  extraArgs: (string | null)[];
};

export async function validateSetEvents(
  setEvents: SETEvents,
  type: AllEventTypes,
  schema: Schema,
  logSet: boolean = false
) {
  if (logSet) {
    console.log(util.inspect(setEvents, false, null, true));
  }

  const event = setEvents[AllEventURIs[type].uri];
  await ValidateService.validate(schema, event);

  const metadata = setEvents[EVENT_METADATA_URI];
  await ValidateService.validate(metadataSchema, metadata);

  const details =
    setEvents[
      EVENT_DETAILS_URI + AllEventURIs[type].detailsKey + '/eventDetails'
    ];
  await ValidateService.validate(detailsSchema, details);
}

describe('generate functions', () => {
  it('generateStandardUserSubjectEvent works with event timestamp', async () => {
    const set = await generateStandardUserSubjectEvents(
      ActivityEventTypes.SessionRecovered,
      'id',
      TimestampTypes.timeStamp,
      100,
      100
    );

    const expectedSet = {
      'https://vocab.account.gov.uk/secevent/v1/activity/sessionRecovered': {
        subject: { format: 'uri', uri: 'id' },
      },
      'https://vocab.account.gov.uk/secevent/v1/eventMetadata': {
        event_timestamp_ms: 100,
      },
      'https://vocab.account.gov.uk/secevent/v1/sessionRecovered/eventDetails':
        { location: 'GB' },
    };

    expect(set).toEqual(expectedSet);
  });

  it('generateStandardUserSubjectEvent works with event timeframe', async () => {
    const set = await generateStandardUserSubjectEvents(
      ActivityEventTypes.SessionRecovered,
      'id',
      TimestampTypes.timeFrame,
      100,
      100
    );

    const expectedSet = {
      'https://vocab.account.gov.uk/secevent/v1/activity/sessionRecovered': {
        subject: { format: 'uri', uri: 'id' },
      },
      'https://vocab.account.gov.uk/secevent/v1/eventMetadata': {
        event_timeframe_ms: { start_time: 100, end_time: 100 },
      },
      'https://vocab.account.gov.uk/secevent/v1/sessionRecovered/eventDetails':
        { location: 'GB' },
    };

    expect(set).toEqual(expectedSet);
  });

  it('generateStandardUserSubjectEvent works with event timeframe, no end time', async () => {
    const set = await generateStandardUserSubjectEvents(
      ActivityEventTypes.SessionRecovered,
      'id',
      TimestampTypes.timeFrame,
      100,
      0
    );

    const expectedSet = {
      'https://vocab.account.gov.uk/secevent/v1/activity/sessionRecovered': {
        subject: { format: 'uri', uri: 'id' },
      },
      'https://vocab.account.gov.uk/secevent/v1/eventMetadata': {
        event_timeframe_ms: { start_time: 100 },
      },
      'https://vocab.account.gov.uk/secevent/v1/sessionRecovered/eventDetails':
        { location: 'GB' },
    };

    expect(set).toEqual(expectedSet);
  });

  it('generateStandardUserSubjectEvent works with event timeframe, no start time', async () => {
    const set = await generateStandardUserSubjectEvents(
      ActivityEventTypes.SessionRecovered,
      'id',
      TimestampTypes.timeFrame,
      0,
      1000
    );

    const expectedSet = {
      'https://vocab.account.gov.uk/secevent/v1/activity/sessionRecovered': {
        subject: { format: 'uri', uri: 'id' },
      },
      'https://vocab.account.gov.uk/secevent/v1/eventMetadata': {
        event_timeframe_ms: { end_time: 1000 },
      },
      'https://vocab.account.gov.uk/secevent/v1/sessionRecovered/eventDetails':
        { location: 'GB' },
    };

    expect(set).toEqual(expectedSet);
  });
});
