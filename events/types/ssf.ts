import { EventFieldNames } from '../enums/event-field-names';

export interface SsfSchema {
  iss: string;
  iat: number;
  jti: string;
  aud: string;
  sub: string;
  toe?: number;
  events: {
    [key: string]: EventStructure;
  };
  exp?: string;
}

export type EventStructure = {
  [key in EventFieldNames]?: string | number | EventSubject | EventClaims;
};

export interface EventClaims {
  [key: string]: string;
}

export type EventSubject = {
  subject_type: string;
  iss: string;
  sub: string;
};
