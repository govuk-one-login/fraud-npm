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
    this.iat = this.generateTimeOfEvent();
    this.jti = this.generateUniqueID();
    this.iss = issuer;
  }

  /**
   * Get current timestamp
   */
  generateTimeOfEvent(): number {
    return new Date().getTime();
  }

  /**
   * Generate unique SET identifier
   */
  generateUniqueID(): string {
    const time: number = new Date().getTime();
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
