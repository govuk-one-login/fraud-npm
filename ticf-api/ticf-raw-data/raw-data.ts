export interface RawDataApiRequest {
  requestType: string;
  requestOriginator: string;
  subjectId: string;
  requestField: NameValue;
}

export interface RawDataApiResponse {
  requestType: string;
  requestId: string;
  requestStatus: string;
  responseField: NameValue;
}

export interface NameValue {
  name: string;
  value?: string;
}
