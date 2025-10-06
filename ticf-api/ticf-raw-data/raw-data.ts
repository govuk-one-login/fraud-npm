export enum RawDataRequestType {
  PASSPORT = 'PASSPORT',
  DRIVERS_PERMIT = 'DRIVERS_PERMIT',
  RESIDENCE_PERMIT = 'RESIDENCE_PERMIT',
  IDENTITY_CARD = 'IDENTITY_CARD',
}

export interface RawDataApiRequest {
  requestType: RawDataRequestType;
  requestOriginator: string;
  subjectId: string;
  requestField: NameValue;
}

export enum RawDataRequestStatus {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface RawDataApiResponse {
  requestType: RawDataRequestType;
  requestId: string;
  requestStatus: RawDataRequestStatus;
  responseField: NameValue;
}

export interface NameValue {
  name: string;
  value?: string;
}
