import { AllEventTypes, AllEventURIs, EventTypes } from '../../enums/events';

/**
 * Return if searchTerm is a valid event type
 */
export const isEventType = (searchTerm: string): searchTerm is AllEventTypes =>
  Object.values(EventTypes).includes(searchTerm as AllEventTypes);

/**
 * Return if searchTerm is a valid event URI
 */
export const isEventURI = (searchTerm: string): boolean =>
  Object.values(AllEventURIs).map((uriInfo) => uriInfo.uri).includes(searchTerm);
