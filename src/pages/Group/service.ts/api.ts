import { apiUrl } from '@/utils/constants/constants';

export const getGroupList = async (): Promise<any> => {
  const res = await fetch(`${apiUrl}/group/getGroupList`, {
    method: 'GET',
    // body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const getGroupDetail = async ({ id }: { id: string }): Promise<any> => {
  const res = await fetch(`${apiUrl}/group/getGroupDetail?id=${id}`, {
    method: 'GET',
    // body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const addGroupMemberApi = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}): Promise<any> => {
  const res = await fetch(`${apiUrl}/group/postAddGroupMember`, {
    method: 'POST',
    body: JSON.stringify({ id, userId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const removeGroupMemberApi = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}): Promise<any> => {
  const res = await fetch(
    `${apiUrl}/group/deleteRemoveGroupMember?id=${id}&userId=${userId}`,
    {
      method: 'DELETE',
      // body: JSON.stringify({ id, userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return await res.json();
};

export const addGroupApi = async ({
  id,
  name,
  type,
}: {
  id: string;
  name: string;
  type: string;
}): Promise<any> => {
  const res = await fetch(`${apiUrl}/group/postAddGroup`, {
    method: 'POST',
    body: JSON.stringify({ id, name, type }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};
