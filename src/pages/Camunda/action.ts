import { Action } from '@/model';

export interface ActionSaveData extends Action {
  payload: { data: any };
  type: 'myBill/saveData';
}
