import { User } from "../entities/User";
import { UserCreateRequest, UserUpdateRequest } from "../types/User";
import * as bcrypt from "bcrypt";
import { Book } from "../entities/Book";
import { userInfo } from "os";
import * as cloudinary from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Cloudnary upload
export const uploadAndAddProfilePic = async (profilePic: string) => {
  try {
    await cloudinary.v2.uploader.upload(profilePic);
  } catch (error) {
    console.error(error);
  }

  return profilePic;
};

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

export const validateCreateRequest = async (
  userRequest: UserCreateRequest
): Promise<User> => {
  const user = new User();

  user.name = userRequest.name;

  user.email = validateAndAddEmail(userRequest.email);

  user.password = await validateAndHashPassword(userRequest.password);

  user.profilePic = await uploadAndAddProfilePic(userRequest.profilePic);

  return user;
};

export const validateUpdateRequest = async (
  userRequest: UserUpdateRequest
): Promise<User> => {
  const user = new User();

  if (userRequest.name) user.name = userRequest.name;

  if (userRequest.email) user.email = validateAndAddEmail(userRequest.email);

  if (userRequest.password)
    user.password = await validateAndHashPassword(userRequest.password);

  if (userRequest.profilePic)
    user.profilePic = await uploadAndAddProfilePic(userRequest.profilePic);

  return user;
};
