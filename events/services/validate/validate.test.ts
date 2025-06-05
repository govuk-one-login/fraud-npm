import { ValidateService } from './validate';
import * as testSchema from './test-schema.json';
import * as testSchemaSubject from './test-schema-subject.json';

describe('ValidateService', () => {
  it('should be defined', () => {
    expect(ValidateService).toBeDefined();
  });

  describe('Check validation against test schema', () => {
    it('works for valid json', async () => {
      let message = {
        firstName: 'Bertie',
        lastName: 'Wooster',
        age: 20,
      };

      await ValidateService.validate(testSchema, message);
    });

    it('throws exception with valid json', async () => {
      let message = {
        lastName: 'Wooster',
        age: 20,
      };
      await expect(
        ValidateService.validate(testSchema, message)
      ).rejects.toThrow(Error);
    });
  });

  describe('Check validation of subject block', () => {
    it('works for valid json', async () => {
      let message = {
        subject: {
          format: 'uri',
          uri: 'urn:fdc:gov.uk:2022:56P4CMsGh_02YOlWpd8PAOI-2sVlB2nsNU7mcLZYhYw=',
        },
      };
      await ValidateService.validate(testSchemaSubject, message);
    });

    it('fails for invalid format', async () => {
      let message = {
        subject: {
          format: 'some-random-string',
          uri: 'urn:fdc:gov.uk:2022:56P4CMsGh_02YOlWpd8PAOI-2sVlB2nsNU7mcLZYhYw=',
        },
      };
      await expect(
        ValidateService.validate(testSchemaSubject, message)
      ).rejects.toThrow(Error);
    });

    it('fails for invalid uri', async () => {
      let message = {
        subject: {
          format: 'uri',
          uri: 'not-a-uri',
        },
      };
      await expect(
        ValidateService.validate(testSchemaSubject, message)
      ).rejects.toThrow(Error);
    });

    it('fails when format is missing', async () => {
      let message = {
        subject: {
          uri: 'urn:fdc:gov.uk:2022:56P4CMsGh_02YOlWpd8PAOI-2sVlB2nsNU7mcLZYhYw=',
        },
      };
      await expect(
        ValidateService.validate(testSchemaSubject, message)
      ).rejects.toThrow(Error);
    });

    it('fails when uri is missing', async () => {
      let message = {
        subject: {
          format: 'uri',
        },
      };
      await expect(
        ValidateService.validate(testSchemaSubject, message)
      ).rejects.toThrow(Error);
    });
  });
});
