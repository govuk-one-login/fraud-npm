import { EventFieldNames } from '../enums/event-field-names';

export interface SsfSchema {
  iss: string; // Issuer: A string identifying the issuer of the SET, ie. the RP. It is also going to be the endpoint from which the RPs public key can be obtained.
  iat: number; // Issued At Time: The issued at claim contains a value representing when the SET was issued
  jti: string; // A unique identifier for the SET. May be used by clients to check if a SET has already been received.
  aud: string; // The audience ID for the SET, as far as we are concerned in shared signals this should be our ID. If not we drop the message.
  events: SETEvents; // A set of event statements describing a single logical event that has occurred about a security subject.
}

export interface SETEvents {
  [key: string]: EventStructure;
}

export type EventStructure = {
  [key in EventFieldNames]?:
    | string
    | number
    | EventSubject
    | EventDeviceSubject
    | EventSessionSubject
    | EventClaims
    | EventStructure
    | EventTimeframe
    | EventTimeframeMilliseconds;
};

export interface EventClaims {
  [key: string]: string;
}

export type EventSubject = {
  format: string;
  uri: string;
};

export type EventDeviceSubject = {
  device: SubjectDevice;
  tenant: SubjectTenant;
};

export type EventSessionSubject = {
  session: SubjectSession;
  user: SubjectUser;
  tenant: SubjectTenant;
};

export type SubjectDevice = {
  format: string;
  iss: string;
  sub: string;
};

export type SubjectTenant = {
  format: string;
  id: string;
};

export type SubjectUser = {
  format: string;
  iss: string;
  sub: string;
};

export type SubjectSession = {
  format: string;
  id: string;
};

export type EventTimeframe = {
  start_time: number;
  end_time: number;
};

export type EventTimeframeMilliseconds = {
  start_time: number;
  end_time: number;
};
