import { TimestampTypes } from '../../enums/events';
import { PopulatedSetService } from './populated-set';
import * as accountDisabledSchema from '../../schemas/risc/account-disabled.json';
import { validateSetEvents } from '../../event-mapping/event-mapping.test';
import { RiscEventTypes, RiscEventURIs } from '../../enums/risc-events';
import { SETEvents } from '../../types/ssf';

describe('PopulatedSetService', () => {
  it('should be defined', () => {
    expect(PopulatedSetService).toBeDefined();
  });

  describe('getEventClass', () => {
    it('should throw if invalid searchTerm', async () => {
      await expect(
        PopulatedSetService.getPopulatedSet('random', 'id', 0, 0)
      ).rejects.toThrow();
    });
  });

  describe('check service works', () => {
    it('should retrieve correct SET by event type', async () => {
      const uri =
        'uri:fdc:gov.uk:2022:56P4CMsGh_02YOlWpd8PAOI-2sVlB2nsNU7mcLZYhYw=';

      const set = await PopulatedSetService.getPopulatedSet(
        'accountDisabled',
        uri,
        1000,
        2000,
        'reason'
      );

      await validateSetEvents(
        set,
        RiscEventTypes.AccountDisabled,
        accountDisabledSchema,
        true
      );
    });

    it('should retrieve correct SET by URI', async () => {
      const uri =
        'uri:fdc:gov.uk:2022:56P4CMsGh_02YOlWpd8PAOI-2sVlB2nsNU7mcLZYhYw=';

      const set = await PopulatedSetService.getPopulatedSet(
        RiscEventURIs[RiscEventTypes.AccountDisabled].uri,
        uri,
        1000,
        2000,
        'reason'
      );

      await validateSetEvents(
        set,
        RiscEventTypes.AccountDisabled,
        accountDisabledSchema,
        true
      );
    });

    it('should retrieve correct SET by URI with timeStamp of now', async () => {
      jest.useFakeTimers().setSystemTime(10000);
      const uri =
        'uri:fdc:gov.uk:2022:56P4CMsGh_02YOlWpd8PAOI-2sVlB2nsNU7mcLZYhYw=';

      const set = await PopulatedSetService.getPopulatedSetNow(
        RiscEventURIs[RiscEventTypes.AccountDisabled].uri,
        uri,
        'reason'
      );

      const expectedSet: SETEvents = {
        'https://vocab.account.gov.uk/secevent/v1/eventMetadata': {
          event_timestamp_ms: 10000,
        },
        'https://vocab.account.gov.uk/secevent/v1/accountDisabled/eventDetails':
          { location: 'GB' },
        'https://schemas.openid.net/secevent/risc/event-type/account-disabled':
          {
            subject: {
              format: 'uri',
              uri: uri,
            },
            reason: 'reason',
          },
      };

      expect(set).toEqual(expectedSet);

      await validateSetEvents(
        set,
        RiscEventTypes.AccountDisabled,
        accountDisabledSchema,
        true
      );
    });

    it('should retrieve correct SET by URI with timeStamp of now and all defaults', async () => {
      jest.useFakeTimers().setSystemTime(10000);
      const uri =
        'uri:fdc:gov.uk:2022:56P4CMsGh_02YOlWpd8PAOI-2sVlB2nsNU7mcLZYhYw=';

      const set = await PopulatedSetService.getPopulatedSetNow(
        RiscEventURIs[RiscEventTypes.AccountDisabled].uri,
        uri
      );

      const expectedSet: SETEvents = {
        'https://vocab.account.gov.uk/secevent/v1/eventMetadata': {
          event_timestamp_ms: 10000,
        },
        'https://vocab.account.gov.uk/secevent/v1/accountDisabled/eventDetails':
          { location: 'GB' },
        'https://schemas.openid.net/secevent/risc/event-type/account-disabled':
          {
            subject: {
              format: 'uri',
              uri: uri,
            },
            reason: 'User suspected of fraud',
          },
      };

      expect(set).toEqual(expectedSet);

      await validateSetEvents(
        set,
        RiscEventTypes.AccountDisabled,
        accountDisabledSchema,
        true
      );
    });
  });
});
