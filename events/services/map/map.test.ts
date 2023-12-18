import { NotificationEventTypes } from '../../enums/notification-events';
import { AccountConcernEvent } from '../../event-classes/notification/account-concern';
import { MapService } from './map';

describe('MapService', () => {
  it('should be defined', () => {
    expect(MapService).toBeDefined();
  });

  describe('getEventClass', () => {
    it('should throw if invalid searchTerm', () => {
      expect(() => MapService.getEventClass('random')).toThrow();
    });

    it.each([[NotificationEventTypes.AccountConcern, AccountConcernEvent]])(
      '',
      (eventType, eventClass) => {
        expect(MapService.getEventClass(eventType)).toBeInstanceOf(
          AccountConcernEvent
        );
      }
    );
  });
});
