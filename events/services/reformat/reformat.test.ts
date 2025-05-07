import { ReformatService } from './reformat';
import { SsfSchema } from '../../types/ssf';
import { TxmaType } from '../../enums/txma';
import { TxmaEventNames } from '../../enums/event-names';

describe('ReformatService', () => {
  it('should be defined', () => {
    expect(ReformatService).toBeDefined();
  });

  describe('Check reformat service', () => {
    it('test reformat service works as expected', async () => {
      jest.useFakeTimers().setSystemTime(10000);

      const set: SsfSchema = {
        iss: 'some-iss',
        iat: 101,
        jti: 'some-jti',
        aud: 'some-aud',
        events: {
          uri: {
            subject: {
              format: 'some-format',
              uri: 'some-uri',
            },
          },
        },
      };

      const expectedTxmaMessage: TxmaType = {
        client_id: 'client-id',
        timestamp: 10,
        event_name: TxmaEventNames.AccountConcern,
        component_id: 'some-iss',
        user: { user_id: 'csi' },
        extensions: {
          SET: {
            iss: 'some-iss',
            iat: 101,
            jti: 'some-jti',
            aud: 'some-aud',
            events: {
              uri: {
                subject: {
                  format: 'some-format',
                  uri: 'some-uri',
                },
              },
            },
          },
        },
      };

      const actualTxMaMessage = await ReformatService.reformatForTxma(
        set,
        TxmaEventNames.AccountConcern,
        'client-id',
        'csi'
      );
      expect(actualTxMaMessage).toEqual(expectedTxmaMessage);
    });
  });

  it('test reformat service works without commonSubjectId as expected', async () => {
    jest.useFakeTimers().setSystemTime(10000);

    const set: SsfSchema = {
      iss: 'some-iss',
      iat: 101,
      jti: 'some-jti',
      aud: 'some-aud',
      events: {
        uri: {
          subject: {
            format: 'some-format',
            uri: 'some-uri',
          },
        },
      },
    };

    const expectedTxmaMessage: TxmaType = {
      client_id: 'client-id',
      timestamp: 10,
      event_name: TxmaEventNames.AccountConcern,
      component_id: 'some-iss',
      extensions: {
        SET: {
          iss: 'some-iss',
          iat: 101,
          jti: 'some-jti',
          aud: 'some-aud',
          events: {
            uri: {
              subject: {
                format: 'some-format',
                uri: 'some-uri',
              },
            },
          },
        },
      },
    };

    const actualTxMaMessage = await ReformatService.reformatForTxma(
      set,
      TxmaEventNames.AccountConcern,
      'client-id',
      undefined
    );
    expect(actualTxMaMessage).toEqual(expectedTxmaMessage);
  });
});
