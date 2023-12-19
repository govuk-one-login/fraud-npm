import { AllEventTypes, AllEventURIs } from '../../enums/events';
import { NotificationEventTypes } from '../../enums/notification-events';
import { AccountConcernEvent } from '../../event-classes/notification/account-concern';
import { eventMapping } from '../../event-mapping/event-mapping';
import { MapService } from './map';

const eventUriTestInput = Object.entries(eventMapping);
const eventTypeTestInput = Object.entries(eventMapping).map((event) => {
  event[0] =
    Object.keys(AllEventURIs).find(
      (uri) => AllEventURIs[uri as AllEventTypes] === event[0]
    ) ?? '';
  return event;
});

describe('MapService', () => {
  it('should be defined', () => {
    expect(MapService).toBeDefined();
  });

  describe('getEventClass', () => {
    it('should throw if invalid searchTerm', () => {
      expect(() => MapService.getEventClass('random')).toThrow();
    });

    it.each(eventTypeTestInput)(
      'should return correct class if accessed by Event Type: %s',
      (eventType, eventClass) => {
        expect(MapService.getEventClass(eventType)).toEqual(eventClass);
      }
    );

    it.each(eventUriTestInput)(
      'should return correct class if accessed by Event URI: %s',
      (eventType, eventClass) => {
        expect(MapService.getEventClass(eventType)).toEqual(eventClass);
      }
    );
  });
});
