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
  DEFAULT_CREDENTIAL_TYPE, DEFAULT_EMAIL, DEFAULT_EMAIL_2, DEFAULT_PHONE, DEFAULT_PHONE_2,
  generateEventMetaDataAndDetails,
  generateStandardUserSubjectEvent,
} from './event-mapping';
import { AllEventURIs, TimestampTypes } from '../enums/events';

export const riscEventMapping: Record<string, any> = {
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

async function generateRiscEmailSubjectEvent(eventType: RiscEventTypes, email: string,
                                              timestampType: TimestampTypes,
                                              startTime: number, endTime: number): Promise<SETEvents> {

  let metadataAndDetails = await generateEventMetaDataAndDetails(eventType, timestampType, startTime, endTime)

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

async function generateRiscPhoneSubjectEvent(eventType: RiscEventTypes, phoneNumber: string,
                                             timestampType: TimestampTypes,
                                             startTime: number, endTime: number): Promise<SETEvents> {

  let metadataAndDetails = await generateEventMetaDataAndDetails(eventType, timestampType, startTime, endTime)

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

export const riscPopulatedEventMapping: Record<string, (id: string, timestampType: TimestampTypes,
      startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => Promise<SETEvents>> = {

  [RiscEventURIs[RiscEventTypes.AccountEnabled].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.AccountEnabled, id, timestampType,
        startTimeAsLong, endTimeAsLong)
    ),

  [RiscEventURIs[RiscEventTypes.AccountDisabled].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) =>
    {
      let ret = await generateStandardUserSubjectEvent(RiscEventTypes.AccountDisabled, id, timestampType,
        startTimeAsLong, endTimeAsLong)
      let event = ret[AllEventURIs[RiscEventTypes.AccountDisabled].uri]
      event ['reason'] = args[0] ?? DEFAULT_ACCOUNT_DISABLED_REASON
      return ret
    },

  [RiscEventURIs[RiscEventTypes.AccountPurged].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.AccountPurged, id, timestampType,
        startTimeAsLong, endTimeAsLong)
    ),

  [RiscEventURIs[RiscEventTypes.AccountCredentialChangeRequired].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.AccountCredentialChangeRequired, id, timestampType,
        startTimeAsLong, endTimeAsLong)
    ),

  [RiscEventURIs[RiscEventTypes.CredentialCompromise].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) =>

      {
        let ret = await generateStandardUserSubjectEvent(RiscEventTypes.CredentialCompromise, id, timestampType,
          startTimeAsLong, endTimeAsLong)
        let event = ret[AllEventURIs[RiscEventTypes.CredentialCompromise].uri]
        event ['credential_type'] = args[0] ?? DEFAULT_CREDENTIAL_TYPE
        return ret
      },

  [RiscEventURIs[RiscEventTypes.IdentifierChanged].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) =>  {
      let ret: SETEvents = {}
      if (id === 'email') {
        ret = await generateRiscEmailSubjectEvent(RiscEventTypes.IdentifierChanged, args[0] ?? DEFAULT_EMAIL, timestampType,
          startTimeAsLong, endTimeAsLong)
      } else if (id === 'phone') {
        ret = await generateRiscPhoneSubjectEvent(RiscEventTypes.IdentifierChanged, args[0] ?? DEFAULT_PHONE, timestampType,
          startTimeAsLong, endTimeAsLong)
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
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => {
      let ret: SETEvents = {}
      if (id === 'email') {
        ret = await generateRiscEmailSubjectEvent(RiscEventTypes.IdentifierRecycled, args[0] ?? DEFAULT_EMAIL, timestampType,
          startTimeAsLong, endTimeAsLong)
      } else if (id === 'phone') {
        ret = await generateRiscPhoneSubjectEvent(RiscEventTypes.IdentifierRecycled, args[0] ?? DEFAULT_PHONE, timestampType,
          startTimeAsLong, endTimeAsLong)
      }
      return ret
    },

  [RiscEventURIs[RiscEventTypes.OptIn].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.OptIn, id, timestampType,
        startTimeAsLong, endTimeAsLong)
    ),

  [RiscEventURIs[RiscEventTypes.OptOutInitiated].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null)[]) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.OptOutInitiated, id, timestampType,
        startTimeAsLong, endTimeAsLong)
    ),

  [RiscEventURIs[RiscEventTypes.OptOutCancelled].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.OptOutCancelled, id, timestampType,
        startTimeAsLong, endTimeAsLong)
    ),

  [RiscEventURIs[RiscEventTypes.OptOutEffective].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.OptOutEffective, id, timestampType,
        startTimeAsLong, endTimeAsLong)
    ),

  [RiscEventURIs[RiscEventTypes.RecoveryActivated].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.RecoveryActivated, id, timestampType,
        startTimeAsLong, endTimeAsLong)
    ),

  [RiscEventURIs[RiscEventTypes.RecoveryInformationChanged].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.RecoveryInformationChanged, id, timestampType,
        startTimeAsLong, endTimeAsLong)
    ),

  [RiscEventURIs[RiscEventTypes.SessionsRevoked].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: (string | null) []) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.SessionsRevoked, id, timestampType,
        startTimeAsLong, endTimeAsLong)
    ),

};
