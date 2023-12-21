import { Dispatch, connect } from '@umijs/max';
import CreateUser from './components/CreateUser';
import UserListPanel from './components/UserListPanel';
import { CamundaDataState } from './model';

export interface CamundaProps {
  camundaData: CamundaDataState;
  dispatch: Dispatch;
  data?: string;
}

export const Camunda: React.FC<CamundaProps> = ({ camundaData, dispatch }) => {
  const data = '创建用户';

  return (
    <>
      {data}
      <CreateUser
        data="111"
        dispatch={dispatch}
        userInfo={camundaData?.userInfo}
      />
      <UserListPanel userList={camundaData?.userList} dispatch={dispatch} />
    </>
  );
};

// export default Camunda;
export default connect(
  ({ camundaData }: { camundaData: CamundaDataState }) => ({ camundaData }),
)(Camunda);
