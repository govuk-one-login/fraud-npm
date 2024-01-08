import { ErrorMessages } from '../../enums/errors';
import { AllEventURIs, AllEventTypes, EventTypes } from '../../enums/events';
import { BaseEvent } from '../../event-classes/base-event';
import { eventMapping } from '../../event-mapping/event-mapping';

export class MapService {
  /**
   * Return correct event class based on the event type or URI passed in
   */
  static getEventClass(searchTerm: string): BaseEvent {
    if (!this.isEventType(searchTerm) && !this.isEventURI(searchTerm))
      throw new Error(ErrorMessages.NotValidEventType);

    return eventMapping[
      this.isEventURI(searchTerm)
        ? searchTerm
        : AllEventURIs[searchTerm as AllEventTypes]
    ];
  }

  /**
   * Return if searchTerm is a valid event type
   */
  static isEventType = (searchTerm: string): searchTerm is AllEventTypes =>
    Object.values(EventTypes).includes(searchTerm as AllEventTypes);

  /**
   * Return if searchTerm is a valid event URI
   */
  static isEventURI = (searchTerm: string): boolean =>
    Object.values(AllEventURIs).includes(searchTerm);
}
