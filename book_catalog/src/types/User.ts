export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
  profilePic: string;
}

export interface UserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
  profilePic?: string;
}
