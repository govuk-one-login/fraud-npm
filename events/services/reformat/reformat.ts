import { TxmaEventNames } from '../../enums/event-names';
import { TxmaType } from '../../enums/txma';
import {
  EventStructure,
  EventSubject,
  SETEvents,
  SsfSchema,
} from '../../types/ssf';

export class ReformatService {
  /**
   * Map the Inbound event to the TxMA message schema and validate required fields.
   *
   * SET messages, that we are mapping from, basically consist of a set of top-level fields and an event,
   * for example:
   *
   * {
   *     "iss": "https://ssf.account.gov.uk/",
   *     "jti": "756E69717565206964656E746966696572",
   *     "iat": 1615305159,
   *     "aud": "https://audience.othergovenmentdepartment.gov/",
   *     "events": {
   *         "https://schemas.openid.net/secevent/caep/event-type/credential-change": {
   *             "subject": {
   *                 "format": "uri",
   *                 "uri": "urn:fdc:gov.uk:2022:56P4CMsGh_02YOlWpd8PAOI-2sVlB2nsNU7mcLZYhYw="
   *             },
   *             "credential_type": "password",
   *             "change_type": "update",
   *             "initiating_entity": "user",
   *             ... etc. etc.
   *
   * The format of these is defined here:
   * https://github.com/govuk-one-login/architecture/blob/main/rfc/0052-shared-signals-data-spec.md
   *
   * Here's an example of a TxMA events, that we are mapping to:
   *
   * {
   *   "event_name": "SSF_INBOUND_ACCOUNT_PURGED",
   *   "user": {
   *     "user_id": "<common subject ID>"
   *     },
   *   "timestamp": "<timestamp of submission to TXMA>",
   *   "component_id": "<iss field from top-level of SET>",
   *   "extensions": {
   *     "SET": {
   *       ... contents of the set ....
   *     }
   *   }
   * }
   *
   * The format of these is defined here:
   * https://govukverify.atlassian.net/wiki/spaces/Architecture/pages/3650519041/Inbound+Event+Field+Mapping+to+TXMA+Audit+Structure
   *
   * @param setMessage - The SSF SET message to map from
   * @param txmaEventName - The name of the TxMA event to map to
   * @param commonSubjectId - The Common Subject Identifier, an internal mID used by OneLogin that is required by TxMA
   * @param clientId - The clientID, a GUID like-ID for the RP that has meaning at TxMA
   *
   * @returns - The mapped TxMA message
   */
  static async reformatForTxma(
    setMessage: SsfSchema,
    txmaEventName: TxmaEventNames,
    clientId: string,
    commonSubjectId?: string
  ): Promise<TxmaType> {
    const userObj = commonSubjectId
      ? { user: { user_id: commonSubjectId } }
      : {};

    return {
      client_id: clientId,
      event_name: txmaEventName,
      ...userObj,
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
