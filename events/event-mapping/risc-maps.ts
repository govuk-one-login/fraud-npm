import { RiscEventTypes, RiscEventURIs } from '../enums/risc-events';
import { AccountCredentialChangeEvent } from '../event-classes/risc/account-credential-change-required';
import { AccountDisabledEvent } from '../event-classes/risc/account-disabled';
import { AccountPurgedEvent } from '../event-classes/risc/account-purged';
import { CredentialCompromiseEvent } from '../event-classes/risc/credential-compromise';
import { IdentifierChangedEvent } from '../event-classes/risc/identifier-changed';
import { IdentifierRecycledEvent } from '../event-classes/risc/identifier-recycled';
import { OptInEvent } from '../event-classes/risc/opt-in';
import { OptOutCancelledEvent } from '../event-classes/risc/opt-out-cancelled';
import { OptOutEffectiveEvent } from '../event-classes/risc/opt-out-effective';
import { OptOutInitiatedEvent } from '../event-classes/risc/opt-out-initiated';
import { RecoveryActivatedEvent } from '../event-classes/risc/recovery-activated';
import { RecoveryInformationChangedEvent } from '../event-classes/risc/recovery-information-changed';
import { SessionsRevokedEvent } from '../event-classes/risc/sessions-revoked';
import { SETEvents } from '../types/ssf';
import {
  DEFAULT_ACCOUNT_DISABLED_REASON,
  DEFAULT_CREDENTIAL_TYPE,
  DEFAULT_EMAIL,
  DEFAULT_EMAIL_2,
  DEFAULT_PHONE,
  DEFAULT_PHONE_2,
  generateMetaDataAndDetailsEvents,
  generateStandardUserSubjectEvents,
} from './events-mapping';
import { AllEventURIs, TimestampTypes } from '../enums/events';

export const riscEventsMapping: Record<string, any> = {
  [RiscEventURIs[RiscEventTypes.AccountPurged].uri]: AccountPurgedEvent,
  [RiscEventURIs[RiscEventTypes.AccountDisabled].uri]: AccountDisabledEvent,
  [RiscEventURIs[RiscEventTypes.AccountEnabled].uri]: AccountPurgedEvent,
  [RiscEventURIs[RiscEventTypes.AccountCredentialChangeRequired].uri]:
    AccountCredentialChangeEvent,
  [RiscEventURIs[RiscEventTypes.CredentialCompromise].uri]: CredentialCompromiseEvent,
  [RiscEventURIs[RiscEventTypes.IdentifierChanged].uri]: IdentifierChangedEvent,
  [RiscEventURIs[RiscEventTypes.IdentifierRecycled].uri]: IdentifierRecycledEvent,
  [RiscEventURIs[RiscEventTypes.OptIn].uri]: OptInEvent,
  [RiscEventURIs[RiscEventTypes.OptOutInitiated].uri]: OptOutInitiatedEvent,
  [RiscEventURIs[RiscEventTypes.OptOutCancelled].uri]: OptOutCancelledEvent,
  [RiscEventURIs[RiscEventTypes.OptOutEffective].uri]: OptOutEffectiveEvent,
  [RiscEventURIs[RiscEventTypes.RecoveryActivated].uri]: RecoveryActivatedEvent,
  [RiscEventURIs[RiscEventTypes.RecoveryInformationChanged].uri]:
    RecoveryInformationChangedEvent,
  [RiscEventURIs[RiscEventTypes.SessionsRevoked].uri]: SessionsRevokedEvent,
};

async function generateRiscEmailSubjectEvents(eventType: RiscEventTypes, email: string,
                                              timestampType: TimestampTypes,
                                              startTimeInMillis: number, endTimeInMillis: number): Promise<SETEvents> {

  let metadataAndDetails = await generateMetaDataAndDetailsEvents(eventType, timestampType, startTimeInMillis, endTimeInMillis)

  return {
    ...metadataAndDetails,
    [AllEventURIs[eventType].uri]: {
      subject: {
        format: 'email',
        email: email
      }
    }
  }
}

async function generateRiscPhoneSubjectEvents(eventType: RiscEventTypes, phoneNumber: string,
                                             timestampType: TimestampTypes,
                                             startTime: number, endTime: number): Promise<SETEvents> {

  let metadataAndDetails = await generateMetaDataAndDetailsEvents(eventType, timestampType, startTime, endTime)

  return {
    ...metadataAndDetails,
    [AllEventURIs[eventType].uri]: {
      subject: {
        format: 'phone',
        phone: phoneNumber
      },
    }
  }
}

export const riscPopulatedEventsMapping: Record<string, (id: string, startTimeInMillis: number, endTimeInMillis: number,
     ...args: (string | null) []) => Promise<SETEvents>> = {

  [RiscEventURIs[RiscEventTypes.AccountEnabled].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number) => (
      await generateStandardUserSubjectEvents(RiscEventTypes.AccountEnabled, id, TimestampTypes.timeStamp,
        startTimeInMillis, endTimeInMillis)
    ),

  [RiscEventURIs[RiscEventTypes.AccountDisabled].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number, ...args: (string | null) []) =>
    {
      let ret = await generateStandardUserSubjectEvents(RiscEventTypes.AccountDisabled, id,
        TimestampTypes.timeStamp, startTimeInMillis, endTimeInMillis)
      let event = ret[AllEventURIs[RiscEventTypes.AccountDisabled].uri]
      event ['reason'] = args[0] ?? DEFAULT_ACCOUNT_DISABLED_REASON
      return ret
    },

  [RiscEventURIs[RiscEventTypes.AccountPurged].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number) => (
      await generateStandardUserSubjectEvents(RiscEventTypes.AccountPurged, id, TimestampTypes.timeStamp,
        startTimeInMillis, endTimeInMillis)
    ),

  [RiscEventURIs[RiscEventTypes.AccountCredentialChangeRequired].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number) => (
      await generateStandardUserSubjectEvents(RiscEventTypes.AccountCredentialChangeRequired, id,
        TimestampTypes.timeStamp, startTimeInMillis, endTimeInMillis)
    ),

  [RiscEventURIs[RiscEventTypes.CredentialCompromise].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number, ...args: (string | null) []) =>

      {
        let ret = await generateStandardUserSubjectEvents(RiscEventTypes.CredentialCompromise, id,
        TimestampTypes.timeStamp, startTimeInMillis, endTimeInMillis)
        let event = ret[AllEventURIs[RiscEventTypes.CredentialCompromise].uri]
        event ['credential_type'] = args[0] ?? DEFAULT_CREDENTIAL_TYPE
        return ret
      },

  [RiscEventURIs[RiscEventTypes.IdentifierChanged].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number, ...args: (string | null) []) =>  {
      let ret: SETEvents = {}
      if (id === 'email') {
        ret = await generateRiscEmailSubjectEvents(RiscEventTypes.IdentifierChanged, args[0] ?? DEFAULT_EMAIL,
          TimestampTypes.timeStamp, startTimeInMillis, endTimeInMillis)
      } else if (id === 'phone') {
        ret = await generateRiscPhoneSubjectEvents(RiscEventTypes.IdentifierChanged, args[0] ?? DEFAULT_PHONE,
          TimestampTypes.timeStamp, startTimeInMillis, endTimeInMillis)
      }
      let event = ret[AllEventURIs[RiscEventTypes.IdentifierChanged].uri]
      if (id === 'email') {
        event['new-value'] = args[1] ?? DEFAULT_EMAIL_2
      } else if (id === 'phone') {
        event['new-value'] = args[1] ?? DEFAULT_PHONE_2
      }
      return ret
    },

  [RiscEventURIs[RiscEventTypes.IdentifierRecycled].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number, ...args: (string | null) []) => {
      let ret: SETEvents = {}
      if (id === 'email') {
        ret = await generateRiscEmailSubjectEvents(RiscEventTypes.IdentifierRecycled, args[0] ?? DEFAULT_EMAIL,
          TimestampTypes.timeStamp, startTimeInMillis, endTimeInMillis)
      } else if (id === 'phone') {
        ret = await generateRiscPhoneSubjectEvents(RiscEventTypes.IdentifierRecycled, args[0] ?? DEFAULT_PHONE,
          TimestampTypes.timeStamp, startTimeInMillis, endTimeInMillis)
      }
      return ret
    },

  [RiscEventURIs[RiscEventTypes.OptIn].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number) => (
      await generateStandardUserSubjectEvents(RiscEventTypes.OptIn, id, TimestampTypes.timeStamp,
        startTimeInMillis, endTimeInMillis)
    ),

  [RiscEventURIs[RiscEventTypes.OptOutInitiated].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number) => (
      await generateStandardUserSubjectEvents(RiscEventTypes.OptOutInitiated, id, TimestampTypes.timeStamp,
        startTimeInMillis, endTimeInMillis)
    ),

  [RiscEventURIs[RiscEventTypes.OptOutCancelled].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number) => (
      await generateStandardUserSubjectEvents(RiscEventTypes.OptOutCancelled, id, TimestampTypes.timeStamp,
        startTimeInMillis, endTimeInMillis)
    ),

  [RiscEventURIs[RiscEventTypes.OptOutEffective].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number) => (
      await generateStandardUserSubjectEvents(RiscEventTypes.OptOutEffective, id, TimestampTypes.timeStamp,
        startTimeInMillis, endTimeInMillis)
    ),

  [RiscEventURIs[RiscEventTypes.RecoveryActivated].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number) => (
      await generateStandardUserSubjectEvents(RiscEventTypes.RecoveryActivated, id, TimestampTypes.timeStamp,
        startTimeInMillis, endTimeInMillis)
    ),

  [RiscEventURIs[RiscEventTypes.RecoveryInformationChanged].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number) => (
      await generateStandardUserSubjectEvents(RiscEventTypes.RecoveryInformationChanged, id, TimestampTypes.timeStamp,
        startTimeInMillis, endTimeInMillis)
    ),

  [RiscEventURIs[RiscEventTypes.SessionsRevoked].uri] :
    async (id: string, startTimeInMillis: number, endTimeInMillis: number) => (
      await generateStandardUserSubjectEvents(RiscEventTypes.SessionsRevoked, id, TimestampTypes.timeStamp,
        startTimeInMillis, endTimeInMillis)
    ),

};
