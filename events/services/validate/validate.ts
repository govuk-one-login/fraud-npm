import Ajv, { Schema, ValidateFunction } from 'ajv';
import addFormats, { FormatName } from 'ajv-formats';

export class ValidateService {
  static readonly AJV: Ajv = new Ajv();
  static readonly AjvFormats: FormatName[] = ['date', 'uri', 'email'];

  /**
   * Validates against a given message against a given schema
   *
   * @param schema Schema to validate against
   * @param message Message to be validated
   */
  static async validate(schema: Schema, message: unknown): Promise<void> {
    addFormats(this.AJV, this.AjvFormats);

    const validate: ValidateFunction = this.AJV.compile(schema);
    const valid: boolean = validate(message);

    if (!valid) throw new Error(JSON.stringify(validate.errors));
  }
}
