import { generateStandardUserSubjectEvent } from './event-mapping';
import { TimestampTypes } from '../enums/events';
import { ActivityEventTypes } from '../enums/activity-events';

// export async function generateStandardUserSubjectEvent(eventType: AllEventTypes, id: string,
//                                                        timestampType: TimestampTypes, startTime: number, endTime: number): Promise<SETEvents> {

describe('generate functions', () => {

  it('generateStandardUserSubjectEvent works with event timestamp', async () => {

    const thing = await generateStandardUserSubjectEvent(ActivityEventTypes.SessionRecovered, 'id', TimestampTypes.timeStamp, 100, 100)

    const expectedThing = {
      'https://vocab.account.gov.uk/secevent/v1/activity/sessionRecovered': { subject: { format: 'uri', uri: 'id' } },
      'https://vocab.account.gov.uk/secevent/v1/eventMetadata': { event_timestamp: 100 },
      'https://vocab.account.gov.uk/secevent/v1/sessionRecovered/eventDetails': { device_id: 'some-device-id', location: 'GB' }
    }

    expect(thing).toEqual(expectedThing);
  });

  it('generateStandardUserSubjectEvent works with event timeframe', async () => {

    const thing = await generateStandardUserSubjectEvent(ActivityEventTypes.SessionRecovered, 'id', TimestampTypes.timeFrame, 100, 100)

    const expectedThing = {
      'https://vocab.account.gov.uk/secevent/v1/activity/sessionRecovered': { subject: { format: 'uri', uri: 'id' } },
      'https://vocab.account.gov.uk/secevent/v1/eventMetadata': { event_timeframe_ms : { start_time: 100, end_time: 100 } },
      'https://vocab.account.gov.uk/secevent/v1/sessionRecovered/eventDetails': { device_id: 'some-device-id', location: 'GB' }
    }

    expect(thing).toEqual(expectedThing);
  });

})
