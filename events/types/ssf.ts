import { EventFieldNames } from '../enums/event-field-names';

export interface SsfSchema {
  iss: string;
  iat: number;
  jti: string;
  aud: string;
  events: SETEvents;
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
    | EventStructure;
};

export interface EventClaims {
  [key: string]: string;
}

export type EventSubject = {
  format: string;
  uri: string;
};
