import { UserCreateRequest } from "../types/User";

export const newUser = (request: any) => {
  const userRequest: UserCreateRequest = {
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    profilePic: request.file.path,
  };

  return userRequest;
};
