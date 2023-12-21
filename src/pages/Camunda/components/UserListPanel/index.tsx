import { Dispatch } from '@umijs/max';
import Table, { ColumnProps } from 'antd/es/table';
import { useEffect, useMemo } from 'react';
import { UserInfoDto } from '../../Camunda.dto';

export interface UserListPanelProps {
  userList: Omit<UserInfoDto, 'password'>[];
  dispatch: Dispatch;
}

export const UserListPanel: React.FC<UserListPanelProps> = ({
  userList,
  dispatch,
}) => {
  useEffect(() => {
    dispatch({
      type: 'camundaData/getUserList',
      payload: {},
    });
  }, []);

  const dataSource = useMemo(() => {
    return userList.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
  }, [userList]);

  const deleteUser = (id: string) => {
    dispatch({
      type: 'camundaData/deleteUser',
      payload: {
        id,
      },
      callback: () => {
        dispatch({
          type: 'camundaData/getUserList',
          payload: {},
        });
      },
    });
  };

  const columns: ColumnProps<Omit<UserInfoDto, 'password'>>[] = [
    {
      title: 'firstName',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'lastName',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'e-Mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ation',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => deleteUser(record.id)}>delete {record.id}</a>
        </span>
      ),
    },
  ];
  return (
    <>
      <div>
        <Table<Omit<UserInfoDto, 'password'>>
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </>
  );
};

export default UserListPanel;
