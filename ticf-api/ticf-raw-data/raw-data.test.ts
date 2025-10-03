import { RawDataApiRequest, RawDataApiResponse } from './raw-data';

describe('RawDataInterface', () => {
  test('request should be defined', () => {
    const req: RawDataApiRequest = {
      requestType: 'reqType',
      requestOriginator: 'requestOriginator',
      subjectId: 'subjectId',
      requestField: {
        name: 'name',
        value: 'value',
      },
    };

    expect(req).toStrictEqual({
      requestType: 'reqType',
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
      requestType: 'reqType',
      requestId: 'requestId',
      requestStatus: 'requestStatus',
      responseField: {
        name: 'name',
        value: 'value',
      },
    };

    expect(req).toStrictEqual({
      requestType: 'reqType',
      requestId: 'requestId',
      requestStatus: 'requestStatus',
      responseField: {
        name: 'name',
        value: 'value',
      },
    });
  });
});
