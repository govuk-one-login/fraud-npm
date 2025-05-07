import { SsfSchema } from '../types/ssf';
import { TxmaEventNames } from './event-names';

export interface TxmaType {
  client_id: string;
  timestamp: number;
  event_name: TxmaEventNames;
  component_id: string;
  user?: { user_id: string };
  restricted?: any;
  extensions: { SET: SsfSchema };
}
