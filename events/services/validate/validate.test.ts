import { ValidateService } from './validate';
import * as eventDetailsSchema from './test-schema.json';

describe('ValidateService', () => {

  it('should be defined', () => {
    expect(ValidateService).toBeDefined();
  });

  describe('Check validation', () => {
    it('works for valid json', async () => {
      let message = {
        firstName: "Bertie",
        lastName: "Wooster",
        age: 20
      }

      await ValidateService.validate(eventDetailsSchema, message)
    });

    it('throws exception with valid json', async () => {
      let message = {
        lastName: "Wooster",
        age: 20
      }
      await expect(ValidateService.validate(eventDetailsSchema, message)).rejects.toThrow(Error)
    });
  });
});
