import {
  GroupDetailDto,
  GroupDto,
  UserInfoDto,
} from '@/pages/Camunda/Camunda.dto';
import { Dispatch } from '@umijs/max';
import { ColumnProps } from 'antd/es/table';
import { Table } from 'antd/lib';
import { useMemo, useState } from 'react';
import GroupDetailModal from '../GroupDetailModal';

export interface GroupListProps {
  groupList: GroupDto[];
  groupDetail: GroupDetailDto;
  userList: Omit<UserInfoDto, 'password'>[];
  dispatch: Dispatch;
}

export const GroupListPanel: React.FC<GroupListProps> = ({
  groupList,
  groupDetail,
  userList,
  dispatch,
}) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const dataSource = useMemo(() => {
    return groupList.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
  }, [groupList]);

  const getUserList = () => {
    dispatch({
      type: 'camundaGroup/getUserList',
      payload: {},
    });
  };

  const openDetail = (id: string) => {
    setShowDetail(true);
    dispatch({
      type: 'camundaGroup/getGroupDetail',
      payload: {
        id,
      },
    });
  };

  const handleOnAddGroupMember = (id: string, userId: string) => {
    dispatch({
      type: 'camundaGroup/addGroupMember',
      payload: {
        id,
        userId,
      },
      callback: () => {
        dispatch({
          type: 'camundaGroup/getGroupDetail',
          payload: {
            id,
          },
        });
      },
    });
  };

  const handelOnRemoveGroupMember = (id: string, userId: string) => {
    dispatch({
      type: 'camundaGroup/removeGroupMember',
      payload: {
        id,
        userId,
      },
      callback: () => {
        dispatch({
          type: 'camundaGroup/getGroupDetail',
          payload: {
            id,
          },
        });
      },
    });
  };

  const columns: ColumnProps<GroupDto>[] = [
    {
      title: 'Group Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Group Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Group Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Ation',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => console.log(record.id)}>delete</a>
          <a> </a>
          <a onClick={() => openDetail(record.id)}>detail</a>
        </span>
      ),
    },
  ];
  return (
    <>
      <div>
        <Table<GroupDto> columns={columns} dataSource={dataSource} />
        <GroupDetailModal
          visible={showDetail}
          groupDetail={groupDetail}
          userList={userList}
          getUserList={getUserList}
          setShowDetail={setShowDetail}
          handleOnAddGroupMember={handleOnAddGroupMember}
          handelOnRemoveGroupMember={handelOnRemoveGroupMember}
        />
      </div>
    </>
  );
};

export default GroupListPanel;
