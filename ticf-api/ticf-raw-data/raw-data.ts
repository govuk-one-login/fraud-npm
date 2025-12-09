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
  requestField: RequestField;
}

export enum RawDataRequestStatus {
  SUCCESSFUL = 'SUCCESSFUL',
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

export interface RequestField extends NameValue {
  hashType?: 'ticf' | 'splunk',
}
