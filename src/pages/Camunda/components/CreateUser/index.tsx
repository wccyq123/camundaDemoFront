import { Dispatch } from '@umijs/max';
import { Button, Input } from 'antd';
import { UserInfoDto } from '../../Camunda.dto';
import styles from './index.less';

export interface CreateUserProps {
  data: string;
  userInfo: UserInfoDto;
  dispatch: Dispatch;
}

export const CreateUser: React.FC<CreateUserProps> = ({
  userInfo,
  dispatch,
}) => {
  const { id, firstName, lastName, email, password } = userInfo;
  const handleOnChange = (
    id: keyof UserInfoDto,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newData = { ...userInfo };
    newData[id] = e.target.value;

    dispatch({
      type: 'camundaData/save',
      payload: { data: newData },
    });
  };
  const handleOnSubmit = () => {
    dispatch({
      type: 'camundaData/createUser',
      payload: { data: 111 },
      callback: () => {
        dispatch({
          type: 'camundaData/getUserList',
          payload: {},
        });
      },
    });
  };
  return (
    <>
      <div className={styles.root}>
        <div>
          <span>id</span>
          <Input value={id} onChange={(e) => handleOnChange('id', e)} />
        </div>
        <div>
          <span>first name</span>
          <Input
            value={firstName}
            onChange={(e) => handleOnChange('firstName', e)}
          />
        </div>
        <div>
          <span>last name</span>
          <Input
            value={lastName}
            onChange={(e) => handleOnChange('lastName', e)}
          />
        </div>
        <div>
          <span>email</span>
          <Input value={email} onChange={(e) => handleOnChange('email', e)} />
        </div>
        <div>
          <span>password</span>
          <Input
            prefix={<span className={styles.redStart}>*</span>}
            value={password}
            onChange={(e) => handleOnChange('password', e)}
          />
        </div>
        <Button onClick={handleOnSubmit}>提交</Button>
      </div>
    </>
  );
};

export default CreateUser;
