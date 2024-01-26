import { activityEventExampleMapping } from './activity-maps';
import { ActivityEventTypes, ActivityEventURIs } from '../enums/activity-events';
import { SETEvents } from '../types/ssf';
import { ValidateService } from '../services/validate/validate';
import * as sessionRecoveredEventSchema from '../schemas/activity/session-recovered.json';
import * as detailsSchema from '../schemas/extensions/event-details.json'
import * as metadataSchema from '../schemas/extensions/metadata.json'
import { EVENT_DETAILS_URI, EVENT_METADATA_URI, MOCK_URI } from './event-mapping';
import { AllEventURIs } from '../enums/events';

describe('generate functions', () => {

  it('generateStandardUserSubjectEvent works with event timestamp', async () => {
    const uri = ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri
    const subjectFn = activityEventExampleMapping[uri]
    const set : SETEvents = subjectFn(MOCK_URI, 100)

    const event = set[ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri]
    await ValidateService.validate(sessionRecoveredEventSchema, event)

    const metadata = set[EVENT_METADATA_URI]
    await ValidateService.validate(metadataSchema, metadata)

    const details = set[EVENT_DETAILS_URI + AllEventURIs[ActivityEventTypes.SessionRecovered].detailsKey + '/eventDetails']
    await ValidateService.validate(detailsSchema, details)
  });

})
