import { TxmaEventNames } from '../../enums/event-names';
import { TxmaType } from '../../enums/txma';
import { SsfSchema } from '../../types/ssf';

export class ReformatService {
  /**
   * Map the Inbound event to the TxMA message schema and validate required fields
   */
  static async reformatForTxma(
    txmaEventName: TxmaEventNames,
    setMessage: SsfSchema
  ): Promise<TxmaType> {
    return {
      event_name: txmaEventName,
      user: {
        user_id: setMessage.sub,
      },
      timestamp: Math.round(new Date().getTime() / 1000),
      component_id: setMessage.iss,
      extensions: {
        SET: {
          ...setMessage,
        },
      },
    };
  }
}
