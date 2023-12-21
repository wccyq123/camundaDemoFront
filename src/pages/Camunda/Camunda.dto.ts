export interface UserInfoDto {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email?: string;
}

export interface RequestCreateUserDto {
  profile: UserProfileDto;
  credentials: CredentialsDto;
}

export interface UserProfileDto {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
}

export interface CredentialsDto {
  password: string;
}

export interface GroupDto {
  id: string;
  name: string;
  type: string;
}

export interface GroupDetailDto {
  groupId: string;
  admin: string[];
  leader: string;
  member: UserProfileDto[];
}
