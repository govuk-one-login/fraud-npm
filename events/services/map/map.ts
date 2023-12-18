import {
  AllEventTypes,
  AllEventURIs,
  EventTypes,
  eventMapping,
} from '../../event-mapping/event-mapping';

export class MapService {
  static getEventClass(searchTerm: string) {
    if (!this.isEventType(searchTerm) || !this.isEventURI(searchTerm))
      throw new Error();

    return eventMapping[
      this.isEventURI(searchTerm) ? searchTerm : AllEventURIs[searchTerm]
    ];
  }

  private static isEventType = (
    searchTerm: string
  ): searchTerm is AllEventTypes =>
    Object.values(EventTypes).includes(searchTerm as AllEventTypes);

  private static isEventURI = (searchTerm: string): boolean =>
    Object.values(AllEventURIs).includes(searchTerm);
}
