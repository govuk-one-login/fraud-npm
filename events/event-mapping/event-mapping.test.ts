import { generateStandardUserSubjectEvent } from './event-mapping';
import { TimestampTypes } from '../enums/events';
import { ActivityEventTypes } from '../enums/activity-events';
import { Schema } from 'ajv';

export type TestInfo = {
  schema : Schema,
  extraArgs: (string | null) []
}

describe('generate functions', () => {

  it('generateStandardUserSubjectEvent works with event timestamp', async () => {

    const thing = await generateStandardUserSubjectEvent(ActivityEventTypes.SessionRecovered,
     'id', TimestampTypes.timeStamp, 100, 100)

    const expectedThing = {
      'https://vocab.account.gov.uk/secevent/v1/activity/sessionRecovered': { subject: { format: 'uri', uri: 'id' } },
      'https://vocab.account.gov.uk/secevent/v1/eventMetadata': { event_timestamp: 100 },
      'https://vocab.account.gov.uk/secevent/v1/sessionRecovered/eventDetails': { location: 'GB' }
    }

    expect(thing).toEqual(expectedThing);
  });

  it('generateStandardUserSubjectEvent works with event timeframe', async () => {

    const thing = await generateStandardUserSubjectEvent(ActivityEventTypes.SessionRecovered,
     'id', TimestampTypes.timeFrame, 100, 100)

    const expectedThing = {
      'https://vocab.account.gov.uk/secevent/v1/activity/sessionRecovered': { subject: { format: 'uri', uri: 'id' } },
      'https://vocab.account.gov.uk/secevent/v1/eventMetadata': { event_timeframe_ms : { start_time: 100, end_time: 100 } },
      'https://vocab.account.gov.uk/secevent/v1/sessionRecovered/eventDetails': { location: 'GB' }
    }

    expect(thing).toEqual(expectedThing);
  });

})
