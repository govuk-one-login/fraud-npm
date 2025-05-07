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

      let set: SsfSchema = {
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

      //let now = Math.round(new Date().getTime() / 1000);

      let expectedTxmaMessage: TxmaType = {
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

      let actualTxMaMessage = await ReformatService.reformatForTxma(
        set,
        TxmaEventNames.AccountConcern,
        'csi',
        'client-id'
      );
      expect(actualTxMaMessage).toEqual(expectedTxmaMessage);
    });
  });

  it('test reformat service works without commonSubjectId as expected', async () => {
    jest.useFakeTimers().setSystemTime(10000);

    let set: SsfSchema = {
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

    let expectedTxmaMessage: TxmaType = {
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

    let actualTxMaMessage = await ReformatService.reformatForTxma(
      set,
      TxmaEventNames.AccountConcern,
      undefined,
      'client-id'
    );
    expect(actualTxMaMessage).toEqual(expectedTxmaMessage);
  });
});
