/*
 * @Autor: wcy
 * @Date: 2022-03-10 19:43:36
 * @LastEditors: wcy
 * @LastEditTime: 2022-03-29 13:36:22
 * @description:
 */
import { Action, Effect, Model, Reducer } from '@/model';
import { message } from 'antd';
import { GroupDetailDto, GroupDto, UserInfoDto } from '../Camunda/Camunda.dto';
import { getUserList } from '../Camunda/services/api';
import {
  addGroupApi,
  addGroupMemberApi,
  getGroupDetail,
  getGroupList,
  removeGroupMemberApi,
} from './service.ts/api';

export interface CamundaGroupState {
  groupList: GroupDto[];
  groupDto: GroupDto;
  groupDetail: GroupDetailDto;
  userList: Omit<UserInfoDto, 'password'>[];
}

export interface CamundaDataModel extends Model<CamundaGroupState> {
  state: CamundaGroupState;
  reducers: {
    save: Reducer;
    saveGroupdto: Reducer;
    saveGroupList: Reducer;
    saveGroupDetail: Reducer;
    saveUserList: Reducer;
  };
  effects: {
    getGroupList: Effect<Action>;
    getGroupDetail: Effect<Action>;
    getUserList: Effect<Action>;
    addGroupMember: Effect<Action>;
    removeGroupMember: Effect<Action>;
    addGroup: Effect<Action>;
  };
}

const CamundaDataInfoModel: CamundaDataModel = {
  namespace: 'camundaGroup',
  state: {
    groupList: [],
    groupDto: {
      id: '',
      name: '',
      type: '',
    },
    groupDetail: {
      groupId: '',
      leader: '',
      admin: [],
      member: [],
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
    saveGroupdto(state, { payload: { groupDto } }) {
      return {
        ...state,
        groupDto,
      };
    },
    saveGroupList(state, { payload: { groupList } }) {
      return {
        ...state,
        groupList,
      };
    },
    saveGroupDetail(state, { payload: { groupDetail } }) {
      return {
        ...state,
        groupDetail,
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
    *getGroupList({ payload: {} }, { put, call }) {
      const res = yield call(getGroupList, {});
      const data = res.data.map(
        (item: { ID_: any; NAME_: any; TYPE_: any }) => {
          return {
            id: item.ID_,
            name: item.NAME_,
            type: item.TYPE_,
          };
        },
      );
      console.log(data);

      yield put({
        type: 'saveGroupList',
        payload: {
          groupList: data,
        },
      });
    },
    *getGroupDetail({ payload: { id } }, { put, call }) {
      const res = yield call(getGroupDetail, { id });
      const data = res.data;
      data.groupId = data.Group;
      yield put({
        type: 'saveGroupDetail',
        payload: {
          groupDetail: data,
        },
      });
    },
    *getUserList({ payload: {} }, { put, call }) {
      const res = yield call(getUserList, {});
      console.log(res);
      yield put({
        type: 'saveUserList',
        payload: {
          userList: res.data,
        },
      });
    },
    *addGroupMember({ payload: { id, userId }, callback }, { call }) {
      const res = yield call(addGroupMemberApi, { id, userId });
      console.log(res);
      message.info(JSON.stringify(res.data));
      if (callback) {
        callback();
      }
    },
    *removeGroupMember({ payload: { id, userId }, callback }, { call }) {
      const res = yield call(removeGroupMemberApi, { id, userId });
      console.log(res);
      message.info(JSON.stringify(res.data));
      if (callback) {
        callback();
      }
    },
    *addGroup({ payload: { id, name, type }, callback }, { call }) {
      const res = yield call(addGroupApi, { id, name, type });
      console.log(res);
      if (res.errMsg) {
        message.info(res.errMsg);
      } else {
        if (callback) {
          callback();
        }
        message.info(JSON.stringify(res.data));
      }
    },
  },
};

export default CamundaDataInfoModel;
