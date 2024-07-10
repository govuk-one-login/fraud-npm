import { ErrorMessages } from '../../enums/errors';
import { AllEventTypes, AllEventURIs } from '../../enums/events';
import { populatedEventsMapping } from '../../event-mapping/events-mapping';
import { SETEvents } from '../../types/ssf';
import { isEventType, isEventURI } from '../service-utils/service-utils';

export class PopulatedSetService {
  /**
   * Return a populated SET given an event type or URI
   */
  static async getPopulatedSet(
    searchTerm: string,
    id: string,
    startTimeInMillis: number,
    endTimeInMillis: number,
    ...extraArgs: (string | null)[]
  ): Promise<SETEvents> {
    if (!isEventType(searchTerm) && !isEventURI(searchTerm))
      throw new Error(ErrorMessages.NotValidEventType);

    const subjectFn =
      populatedEventsMapping[
        isEventURI(searchTerm)
          ? searchTerm
          : AllEventURIs[searchTerm as AllEventTypes].uri
      ];

    return await subjectFn(
      id,
      startTimeInMillis,
      endTimeInMillis,
      ...extraArgs
    );
  }

  static async getPopulatedSetNow(
    searchTerm: string,
    id: string,
    ...extraArgs: (string | null)[]
  ): Promise<SETEvents> {
    const nowInMillis = Date.now();
    return PopulatedSetService.getPopulatedSet(
      searchTerm,
      id,
      nowInMillis,
      nowInMillis,
      ...extraArgs
    );
  }
}
