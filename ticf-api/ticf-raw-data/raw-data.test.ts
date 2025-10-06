import { RawDataApiRequest, RawDataApiResponse, RawDataRequestStatus, RawDataRequestType } from './raw-data';

describe('RawDataInterface', () => {
  test('request should be defined', () => {
    const req: RawDataApiRequest = {
      requestType: RawDataRequestType.PASSPORT,
      requestOriginator: 'requestOriginator',
      subjectId: 'subjectId',
      requestField: {
        name: 'name',
        value: 'value',
      },
    };

    expect(req).toStrictEqual({
      requestType: RawDataRequestType.PASSPORT,
      requestOriginator: 'requestOriginator',
      subjectId: 'subjectId',
      requestField: {
        name: 'name',
        value: 'value',
      },
    });
  });

  test('response should be defined', () => {
    const req: RawDataApiResponse = {
      requestType: RawDataRequestType.PASSPORT,
      requestId: 'requestId',
      requestStatus: RawDataRequestStatus.COMPLETED,
      responseField: {
        name: 'name',
        value: 'value',
      },
    };

    expect(req).toStrictEqual({
      requestType: RawDataRequestType.PASSPORT,
      requestId: 'requestId',
      requestStatus: RawDataRequestStatus.COMPLETED,
      responseField: {
        name: 'name',
        value: 'value',
      },
    });
  });
});
