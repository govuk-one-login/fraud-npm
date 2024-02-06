import { activityPopulatedEventMapping } from './activity-maps';
import { ActivityEventTypes, ActivityEventURIs } from '../enums/activity-events';
import { SETEvents } from '../types/ssf';
import { ValidateService } from '../services/validate/validate';
import * as sessionRecoveredEventSchema from '../schemas/activity/session-recovered.json';
import * as detailsSchema from '../schemas/extensions/event-details.json'
import * as metadataSchema from '../schemas/extensions/metadata.json'
import { EVENT_DETAILS_URI, EVENT_METADATA_URI, MOCK_URI } from './event-mapping';
import { AllEventURIs, TimestampTypes } from '../enums/events';

const SESSION_ID = 'xl64R1ZpElhTUf11Gz6Kj1FSMFdLimgiJKMyBzn8lMI'
const PREV_SESSION_ID = 'LUpQMy66HnL1SxCdqZuuujWgZiLcKiBOEhzJs8uXiAE'
const INITIATING_ENTITY = 'System initiated session recovery'
const REASON = 'Something went wrong'

describe('generate functions', () => {

  it('check populated event conforms to schema', async () => {
    const uri = ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri
    const subjectFn = activityPopulatedEventMapping[uri]

    const set: SETEvents = await subjectFn(MOCK_URI, TimestampTypes.timeStamp,
      100, 100, SESSION_ID, PREV_SESSION_ID, INITIATING_ENTITY, REASON)

    const event = set[ActivityEventURIs[ActivityEventTypes.SessionRecovered].uri]
    await ValidateService.validate(sessionRecoveredEventSchema, event)

    const metadata = set[EVENT_METADATA_URI]
    await ValidateService.validate(metadataSchema, metadata)

    const details = set[EVENT_DETAILS_URI + ActivityEventURIs[ActivityEventTypes.SessionRecovered].detailsKey + '/eventDetails']
    await ValidateService.validate(detailsSchema, details)
  });

})
