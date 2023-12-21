/*
 * @Autor: wcy
 * @Date: 2022-03-10 19:45:31
 * @LastEditors: wcy
 * @LastEditTime: 2022-03-12 14:31:10
 */
import { PutEffect, call, cancel, select, take } from 'redux-saga/effects';

export interface Action {
  type: any;
  payload: any;
  callback?: any;
}

export interface EffectsCommandMap {
  put: PutEffect;
  call: typeof call;
  select: typeof select;
  take: typeof take;
  cancel: typeof cancel;
}

export type Effect<Actions extends Action = Action> = (
  action: Actions,
  effects: any,
) => void;

export type Reducer = (state: any, action: Action) => any;

export interface Model<State> {
  namespace: string;
  state: State;
  reducers: Record<string, Reducer>;
  effects: Record<string, Effect<Action>>;
}
