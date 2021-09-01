import { User } from "../entities/User";
import { UserCreateRequest, UserUpdateRequest } from "../types/User";
import * as bcrypt from "bcrypt";

export const validateAndAddName = (name: string) => {
  if (name == null || name == undefined || name == "") {
    throw new Error("O nome precisa ser preenchido.");
  } else return name;
};

export const validateAndAddEmail = (email: string): string => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (regex.test(email)) return email;
  else throw new Error("Email inválido!");
};

export const validateAndHashPassword = (password: string): Promise<string> => {
  if (password.length >= 6) return bcrypt.hash(password, 10);
  else throw new Error("Senha precisa ter mais de 6 caracteres");
};

export const validateAndAddProfilePic = (profilePic: string) => {
  return profilePic;
};

export const validateCreateRequest = async (
  userRequest: UserCreateRequest
): Promise<User> => {
  const user = new User();

  user.name = validateAndAddName(userRequest.name);

  user.email = validateAndAddEmail(userRequest.email);

  user.password = await validateAndHashPassword(userRequest.password);

  user.profilePic = validateAndAddProfilePic(userRequest.profilePic); // integrar com Cloudnary

  return user;
};

export const validateUpdateRequest = async (
  userRequest: UserUpdateRequest
): Promise<User> => {
  const user = new User();

  if (userRequest.name) user.name = validateAndAddName(userRequest.name);

  if (userRequest.email) user.email = validateAndAddEmail(userRequest.email);

  if (userRequest.password)
    user.password = await validateAndHashPassword(userRequest.password);

  if (userRequest.profilePic)
    user.profilePic = validateAndAddProfilePic(userRequest.profilePic); // integrar com Cloudnary

  return user;
};
