import { apiUrl } from '@/utils/constants/constants';
import { RequestCreateUserDto } from '../Camunda.dto';

export const createUser = async (
  params: RequestCreateUserDto,
): Promise<any> => {
  const res = await fetch(`${apiUrl}/user/createUser`, {
    method: 'POST',
    body: JSON.stringify({ ...params }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const getUserList = async (): Promise<any> => {
  const res = await fetch(`${apiUrl}/user/getUserList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
  // return await res.json();
};

export const deleteUser = async (id: string): Promise<any> => {
  const res = await fetch(`${apiUrl}/user/deleteUser`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};
