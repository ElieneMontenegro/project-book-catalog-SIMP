import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import {
  validateCreateRequest,
  validateUpdateRequest,
} from "../helpers/validations";
import { UserCreateRequest, UserUpdateRequest } from "../types/User";

export const getAllUsers = async (): Promise<User[]> => {
  return getRepository(User).find();
};

export const getUser = async (id: string): Promise<User> => {
  const user = await getRepository(User).findOne(id);
  if (!user) {
    throw new Error("usuário não encontrado");
  }
  return user;
};

export const createUser = async (
  userRequest: UserCreateRequest
): Promise<User> => {
  const user = await validateCreateRequest(userRequest);
  user.books = [];

  return getRepository(User).save(user);
};

export const updateUser = async (
  id: string,
  userRequest: UserUpdateRequest
): Promise<User> => {
  const user = await validateUpdateRequest(userRequest);
  const update = await getRepository(User).update(id, user);

  if (update.affected) {
    return await getRepository(User).findOne(id);
  }
  throw new Error("não foi possível encontrar o usuário, tente novamente.");
};

export const deleteUser = async (id: string): Promise<User> => {
  const user = await getRepository(User).findOne(id);

  const deletion = await getRepository(User).delete(id);

  if (deletion.affected) {
    return user;
  }
  throw new Error("não é possível deletar um usuário que não existe.");
};
