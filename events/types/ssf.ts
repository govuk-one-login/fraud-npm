import { EventFieldNames } from '../enums/event-field-names';

export interface SsfSchema {
  iss: string; // Issuer: A string identifying the issuer of the SET, ie. the RP. It is also going to be the endpoint from which the RPs public key can be obtained.
  iat: number; // Issued At Time: The issued at claim contains a value representing when the SET was issued
  jti: string; // A unique identifier for the SET. May be used by clients to check if a SET has already been received.
  aud: string; // The audience ID for the SET, as far as we are concerned in shared signals this should be our ID. If not we drop the message.
  events: SETEvents; // A set of event statements describing a single logical event that has occurred about a security subject.

  // Optional to inbound-ssf
  txn?: string; // Transaction ID: A OneLogin defined field used as a way to group multiple events that refer to the same incident
  toe?: number; // This is the time the event occurred.
  exp?: string;
}

export interface SETEvents {
  [key: string]: EventStructure;
}

export type EventStructure = {
  [key in EventFieldNames]?:
    | string
    | number
    | EventSubject
    | EventClaims
    | EventStructure
    | EventTimeframe
};

export interface EventClaims {
  [key: string]: string;
}

export type EventSubject = {
  format: string;
  uri: string;
};

export type EventTimeframe = {
  start_time: number;
  end_time: number;
};


