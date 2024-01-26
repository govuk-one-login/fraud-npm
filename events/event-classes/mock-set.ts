import { BaseSET } from './base-set';
import { MockRPs } from './mock-rps';
import { EventSubject } from '../types/ssf';
import { AllEventTypes, EventTypes } from '../enums/events';
import { BaseEvent } from './base-event';
import { MapService } from '../services/map/map';

export interface ErroneousJsonMockSET {
  iss?: any;
  jti?: any;
  iat?: any;
  aud?: any;
  sub?: any;
  events?: any;
  txn?: any;
  toe?: any;
  exp?: any;
}

export class MockSET {
  mockSET: BaseSET | ErroneousJsonMockSET;

  constructor() {
    this.mockSET = {
      iss: 'https://MockRP1.account.gov.uk/publicKey/',
      jti: '1111AAAA',
      iat: 0,
      aud: 'https://inbound.ssf.account.gov.uk/',
      sub: 'RP1USER1',
      txn: '2222BBBB',
      toe: 10,
      events: 'No event supplied',
    };
  }

  /**
   * Ensures all promises resolve for adjusting the static fields (ones not based of config params)
   */
  public async fillStaticFields(): Promise<void> {
    this.mockSET.jti = BaseSET.generateUniqueID()
    this.mockSET.iat = new Date().getTime();
    this.mockSET.txn = BaseSET.generateUniqueID();
    this.mockSET.toe = await this.generateTimeOfEvent();
  }

  /**
   * Gets the current time and takes away up to 24 hours worth of milliseconds (86400000)
   *
   * @returns a random time from the last 24 hours
   */
  private async generateTimeOfEvent(): Promise<number> {
    const currentTime: number = new Date().getTime();
    const twentyFourHoursInMilliSeconds: number = 86400000;
    return (
      currentTime - Math.round(Math.random() * twentyFourHoursInMilliSeconds)
    );
  }

  /**
   * Set the values relevant to the given RP of origin
   *
   * @param rpSplit is the probability ratio of messages to come from the 3 mock rps
   */
  public async setRpValues(relyingParty: keyof typeof MockRPs): Promise<void> {

    this.mockSET.iss = MockRPs[relyingParty].publicKeyURL;

    const userPairwiseIDs = MockRPs[relyingParty].userPairwiseIDs;

    const userPairwiseIDsKeys: Array<string> = Object.keys(userPairwiseIDs);

    const chosenUser = userPairwiseIDsKeys[
      Math.floor(Math.random() * userPairwiseIDsKeys.length)
      ] as keyof typeof userPairwiseIDs;

    ((this.mockSET.events[Object.keys(this.mockSET.events)[0]]?.subject) as EventSubject).uri = userPairwiseIDs[chosenUser];
  }

  /**
   * Set the event field.
   *
   * @param eventSplit is the probability ratio of events types to be sent
   */
  public async setEvent(randomEventType: string): Promise<void> {
  // TODO - not finished - need to instantiate, plus metadata and extendsions
    this.mockSET.events = MapService.getEventClass(randomEventType)
  }

  /**
   * Potentially error one of the fields by making it undefined
   *
   * @param eventSplit is the probability that one of the SET values will get errored
   */
  public async addError(errorChance: number): Promise<void> {

    // do not add an error if random-number is out of range [0, errorChance) i.e. random-number >= errorChance
    if (Math.random() >= errorChance) {
      return;
    }

    const setFields: Array<string> = [
      'iss',
      'iat',
      'jti',
      'aud',
      'sub',
      'txn',
      'toe',
      'events',
    ];
    const fieldToError: string =
      setFields[Math.floor(Math.random() * setFields.length)];

    // Switch case used as more varied errors are likely to be wanted in the future past making the whole field undefined
    switch (fieldToError) {
      case 'iss': {
        this.mockSET.iss = undefined;
        break;
      }
      case 'iat': {
        this.mockSET.iat = undefined;
        break;
      }
      case 'jti': {
        this.mockSET.jti = undefined;
        break;
      }
      case 'aud': {
        this.mockSET.aud = undefined;
        break;
      }
      case 'txn': {
        this.mockSET.txn = undefined;
        break;
      }
      case 'toe': {
        this.mockSET.toe = undefined;
        break;
      }
      case 'events': {
        this.mockSET.events = undefined;
        break;
      }
    }
  }
}
