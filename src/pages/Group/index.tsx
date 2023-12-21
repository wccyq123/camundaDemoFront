import { Dispatch, connect } from '@umijs/max';
import { Button, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { GroupDto } from '../Camunda/Camunda.dto';
import GroupListPanel from './components/GroupList';
import { CamundaGroupState } from './model';

export interface GroupPageProps {
  camundaGroup: CamundaGroupState;
  dispatch: Dispatch;
}

export const GroupPage: React.FC<GroupPageProps> = ({
  camundaGroup,
  dispatch,
}) => {
  console.log(camundaGroup);

  const { groupList, groupDetail, userList, groupDto } = camundaGroup;
  const { id, name, type } = groupDto;
  console.log(groupDto);

  const [showAddGroupModal, setShowAddGroupModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch({
      type: 'camundaGroup/getGroupList',
      payload: {},
    });
  }, []);

  const handleOnAddGroup = () => {
    dispatch({
      type: 'camundaGroup/addGroup',
      payload: { id, name, type },
      callback: () => {
        setShowAddGroupModal(false);
        dispatch({
          type: 'camundaGroup/getGroupList',
          payload: {},
        });
      },
    });
  };

  const handleOnChange = (
    id: keyof GroupDto,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newData = { ...groupDto };
    newData[id] = e.target.value;

    dispatch({
      type: 'camundaGroup/saveGroupdto',
      payload: { groupDto: newData },
    });
  };

  return (
    <>
      <div style={{ float: 'right' }}>
        <Button type="primary" onClick={() => setShowAddGroupModal(true)}>
          新增用户组
        </Button>
      </div>
      <Modal
        open={showAddGroupModal}
        centered
        onOk={handleOnAddGroup}
        onCancel={() => setShowAddGroupModal(false)}
      >
        <div>
          <span>id</span>
          <Input value={id} onChange={(e) => handleOnChange('id', e)} />
        </div>
        <div>
          <span>name</span>
          <Input value={name} onChange={(e) => handleOnChange('name', e)} />
        </div>
        <div>
          <span>type</span>
          <Input value={type} onChange={(e) => handleOnChange('type', e)} />
        </div>
      </Modal>
      <div>
        <GroupListPanel
          groupList={groupList}
          groupDetail={groupDetail}
          userList={userList}
          dispatch={dispatch}
        />
      </div>
    </>
  );
};

// export default GroupPage;
export default connect(
  ({ camundaGroup }: { camundaGroup: CamundaGroupState }) => ({ camundaGroup }),
)(GroupPage);
