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
import { EventSubject, SETEvents } from '../types/ssf';
import {
  EVENT_DETAILS_URI,
  EVENT_METADATA_URI,
  generateStandardUserSubjectEvent,
  MOCK_DEVICE_ID,
  DEFAULT_LOCATION,
} from './event-mapping';
import { AllEventTypes, AllEventURIs, TimestampTypes } from '../enums/events';
import * as events from 'events';

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

export const riscPopulatedEventMapping: Record<string, (id: string, timestampType: TimestampTypes,
      startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => Promise<SETEvents>> = {

  [RiscEventURIs[RiscEventTypes.AccountEnabled].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.AccountEnabled, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

  [RiscEventURIs[RiscEventTypes.AccountDisabled].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) =>
    {
      let ret = await generateStandardUserSubjectEvent(RiscEventTypes.AccountDisabled, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
      let event = ret[AllEventURIs[RiscEventTypes.AccountDisabled].uri]
      event ['reason'] = args[0]
      return ret
    },

  [RiscEventURIs[RiscEventTypes.AccountPurged].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.AccountPurged, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

  [RiscEventURIs[RiscEventTypes.AccountCredentialChangeRequired].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.AccountCredentialChangeRequired, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

  [RiscEventURIs[RiscEventTypes.CredentialCompromise].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) =>

      {
        let ret = await generateStandardUserSubjectEvent(RiscEventTypes.CredentialCompromise, id, timestampType,
          startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
        let event = ret[AllEventURIs[RiscEventTypes.CredentialCompromise].uri]
        event ['credential_type'] = args[0]
        return ret
      },

  [RiscEventURIs[RiscEventTypes.IdentifierChanged].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) =>  {
      let ret = await generateStandardUserSubjectEvent(RiscEventTypes.IdentifierChanged, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
      if (id === 'email') {
        ret[AllEventURIs[RiscEventTypes.IdentifierChanged].uri] = {
          subject: {
            format: 'email',
            email: args[0]
          },
          'new-value': args[1]
        }
      } else {
        ret[AllEventURIs[RiscEventTypes.IdentifierChanged].uri] = {
          subject: {
            format: 'phone',
            phone: args[0]
          },
          'new-value': args[1]
        }
      }
      return ret
    },

  [RiscEventURIs[RiscEventTypes.IdentifierRecycled].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => {
      let ret = await generateStandardUserSubjectEvent(RiscEventTypes.IdentifierRecycled, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
      if (id === 'email') {
        ret[AllEventURIs[RiscEventTypes.IdentifierRecycled].uri] = {
          subject: {
            format: 'email',
            email: args[0]
          }
        }
      } else {
        ret[AllEventURIs[RiscEventTypes.IdentifierRecycled].uri] = {
          subject: {
            format: 'phone',
            phone: args[0]
          }
        }
      }
      return ret
    },

  [RiscEventURIs[RiscEventTypes.OptIn].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.OptIn, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

  [RiscEventURIs[RiscEventTypes.OptOutInitiated].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.OptOutInitiated, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

  [RiscEventURIs[RiscEventTypes.OptOutCancelled].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.OptOutCancelled, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

  [RiscEventURIs[RiscEventTypes.OptOutEffective].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.OptOutEffective, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

  [RiscEventURIs[RiscEventTypes.RecoveryActivated].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.RecoveryActivated, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

  [RiscEventURIs[RiscEventTypes.RecoveryInformationChanged].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.RecoveryInformationChanged, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

  [RiscEventURIs[RiscEventTypes.SessionsRevoked].uri] :
    async (id: string, timestampType: TimestampTypes,
           startTimeAsLong: number, endTimeAsLong: number, ...args: string[]) => (
      await generateStandardUserSubjectEvent(RiscEventTypes.SessionsRevoked, id, timestampType,
        startTimeAsLong, endTimeAsLong, "", DEFAULT_LOCATION)
    ),

};
