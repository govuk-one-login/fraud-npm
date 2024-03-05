import { ErrorMessages } from '../../enums/errors';
import { AllEventTypes, AllEventURIs } from '../../enums/events';
import { BaseEvent } from '../../event-classes/base-event';
import { eventsMapping } from '../../event-mapping/events-mapping';
import { isEventType, isEventURI } from '../service-utils/service-utils';

export class MapService {
  /**
   * Return correct event class based on the event type or URI passed in
   */
  static getEventClass(searchTerm: string): BaseEvent {
    if (!isEventType(searchTerm) && !isEventURI(searchTerm))
      throw new Error(ErrorMessages.NotValidEventType);

    return eventsMapping[isEventURI(searchTerm) ? searchTerm : AllEventURIs[searchTerm as AllEventTypes].uri];
  }
}
