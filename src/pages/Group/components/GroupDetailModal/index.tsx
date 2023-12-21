import {
  GroupDetailDto,
  UserInfoDto,
  UserProfileDto,
} from '@/pages/Camunda/Camunda.dto';
import { Button, Modal, Select } from 'antd';
import Table, { ColumnProps } from 'antd/es/table';
import { useMemo, useState } from 'react';
import styles from './index.less';

export interface GroupDetailProps {
  visible: boolean;
  groupDetail: GroupDetailDto;
  userList: Omit<UserInfoDto, 'password'>[];
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  getUserList: () => void;
  handleOnAddGroupMember: (id: string, userId: string) => void;
  handelOnRemoveGroupMember: (id: string, userId: string) => void;
}

export const GroupDetailModal: React.FC<GroupDetailProps> = ({
  visible,
  groupDetail,
  userList,
  getUserList,
  setShowDetail,
  handleOnAddGroupMember,
  handelOnRemoveGroupMember,
}) => {
  const { Option } = Select;
  const [showMemberSelect, setShowMemberSelect] = useState<boolean>(false);
  const [selectMember, setSelectMember] = useState<string>('');
  const { member } = groupDetail;
  const dataSource = useMemo(() => {
    return member.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
  }, [groupDetail]);

  const handleOnAddMember = () => {
    getUserList();
    setShowMemberSelect(true);
  };

  const handleOnConfirm = () => {
    setShowMemberSelect(false);
    handleOnAddGroupMember(groupDetail.groupId, selectMember);
  };

  const handleOnRemove = (userId: string) => {
    handelOnRemoveGroupMember(groupDetail.groupId, userId);
  };

  const columns: ColumnProps<UserProfileDto>[] = [
    {
      title: 'Member Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ation',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => handleOnRemove(record.id)}>remove</a>
        </span>
      ),
    },
  ];

  return (
    <>
      <div>
        <Modal
          title="Group Detail"
          open={visible}
          destroyOnClose
          onCancel={() => setShowDetail(false)}
          centered
        >
          <div className={styles.modalContainer}>
            <span>Administrator: {groupDetail.admin.toString()}</span>
            <span>Leader: {groupDetail.leader}</span>
          </div>
          <div className={styles.modalAddButton}>
            <Button
              type="primary"
              onClick={handleOnAddMember}
              style={{ float: 'right' }}
            >
              新增成员
            </Button>
            {showMemberSelect && (
              <div>
                <Select
                  // mode="multiple"
                  style={{ width: 280 }}
                  // maxTagCount={3}
                  // maxTagTextLength={5}
                  onSelect={(e) => setSelectMember(e)}
                >
                  {userList.map((user) => {
                    return <Option key={user.id}>{user.id}</Option>;
                  })}
                </Select>
                <Button onClick={handleOnConfirm}>确定</Button>
              </div>
            )}
          </div>
          <Table<UserProfileDto> columns={columns} dataSource={dataSource} />
        </Modal>
      </div>
    </>
  );
};

export default GroupDetailModal;
