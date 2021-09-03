import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import * as UserService from "../services/UserService";
import { UserCreateRequest } from "../types/User";

//GET '/users'
export const getAllUsers = async (request: Request, response: Response) => {
  try {
    const users = await UserService.getAllUsers();
    response.status(200).send(users);
  } catch (error) {
    response.status(404).send(error.message);
  }
};

//GET '/users/:id'
export const getUser = async (request: Request, response: Response) => {
  try {
    const user = await UserService.getUser(request.params.id);
    response.status(200).send(user);
  } catch (error) {
    response.status(404).send(error.message);
  }
};

//POST '/users'
export const createUser = async (request: any, response: Response) => {
  const userRequest: UserCreateRequest = {
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    profilePic: request.file.path,
  };

  try {
    const user = await UserService.createUser(userRequest);
    response.status(200).send(user);
  } catch (error) {
    response.status(412).send(error.message);
  }
};

//UPDATE '/users/:id'
export const updateUser = async (request: Request, response: Response) => {
  const userRequest: UserCreateRequest = {
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    profilePic: request.file.path,
  };

  try {
    const user = await UserService.updateUser(request.params.id, userRequest);
    response.status(200).send(user);
  } catch (error) {
    response.status(412).send(error.message);
  }
};

//DELETE '/users/:id'
export const deleteUser = async (request: Request, response: Response) => {
  try {
    const user = await UserService.deleteUser(request.params.id);
    response.status(200).send(user);
  } catch (error) {
    response.status(404).send(error.message);
  }
};
