import { EventStructure, SsfSchema } from '../types/ssf';

export class BaseSET implements SsfSchema {
  iss: string;
  iat: number;
  jti: string;
  aud: string = 'https://ssf.account.gov.uk/';
  events: {
    [key: string]: EventStructure;
  } = {};

  constructor(issuer: string) {
    this.iat = BaseSET.generateTimeOfEvent();
    this.jti = BaseSET.generateUniqueID();
    this.iss = issuer;
  }

  /**
   * Get current timestamp
   */
  static generateTimeOfEvent(): number {
    return new Date().getTime();
  }

  /**
   * Generate unique SET identifier
   */
  static generateUniqueID(): string {
    const time: number = BaseSET.generateTimeOfEvent()
    const characters: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let uniqueID: string = time.toString();

    let randomIndex: number = 0;
    let randomChar: string = '';
    for (let i = 0; i < 8; i++) {
      randomIndex = Math.floor(Math.random() * uniqueID.length);
      randomChar = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      uniqueID =
        uniqueID.slice(0, randomIndex) +
        randomChar +
        uniqueID.slice(randomIndex);
    }
    return uniqueID;
  }
}
