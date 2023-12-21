/*
 * @Autor: wcy
 * @Date: 2022-03-10 19:43:36
 * @LastEditors: wcy
 * @LastEditTime: 2022-03-29 13:36:22
 * @description:
 */
import { Action, Effect, Model, Reducer } from '@/model';
import { message } from 'antd';
import { RequestCreateUserDto, UserInfoDto } from './Camunda.dto';
import { createUser, deleteUser, getUserList } from './services/api';

export interface CamundaDataState {
  userInfo: UserInfoDto;
  userList: Omit<UserInfoDto, 'password'>[];
}

export interface CamundaDataModel extends Model<CamundaDataState> {
  state: CamundaDataState;
  reducers: {
    save: Reducer;
    saveUserList: Reducer;
  };
  effects: {
    createUser: Effect<Action>;
    getUserList: Effect<Action>;
    deleteUser: Effect<Action>;
  };
}

const CamundaDataInfoModel: CamundaDataModel = {
  namespace: 'camundaData',
  state: {
    userInfo: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    userList: [],
  },
  reducers: {
    save(state, { payload: { data } }) {
      return {
        ...state,
        userInfo: data,
      };
    },
    saveUserList(state, { payload: { userList } }) {
      return {
        ...state,
        userList,
      };
    },
  },
  effects: {
    *createUser({ payload, callback }, { put, call, select }) {
      const tState: CamundaDataState = yield select(
        (state: any) => state.camundaData,
      );
      const { userInfo } = tState;
      const { id, firstName, lastName, email, password } = userInfo;
      const params: RequestCreateUserDto = {
        profile: { id, firstName, lastName, email },
        credentials: { password },
      };
      const res = yield call(createUser, { ...params });
      console.log(res);

      message.info(JSON.stringify(res));
      if (!res.errorCode) {
        yield put({
          type: 'save',
          payload: {
            data: {
              id: '',
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            },
          },
        });
        if (callback) {
          callback();
        }
      }
    },
    *getUserList({ payload: { data } }, { put, call, select }) {
      const res = yield call(getUserList, {});
      console.log(res);
      yield put({
        type: 'saveUserList',
        payload: {
          userList: res.data,
        },
      });
    },
    *deleteUser({ payload: { id }, callback }, { put, call, select }) {
      const res = yield call(deleteUser, id);
      message.info(JSON.stringify(res));
      if (!res.errorCode && callback) {
        callback();
      }
    },
  },
};

export default CamundaDataInfoModel;
