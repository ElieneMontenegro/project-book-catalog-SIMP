import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";



//definir tipagens

//GET '/users'
export const getAllUsers = async (request: Request, response: Response) => {
    const users = await getRepository(User).find();
    return response.json(users)
};

//GET '/users/:id'
export const getUser = async (request: Request, response: Response) => {
    const user = await getRepository(User).findOne(request.params.id);
    return response.json(user)
};

//POST '/users'
export const createUser = async (request: Request, response: Response) => {
    const user = await getRepository(User).save(request.body);
    return response.json(user)
};

//UPDATE '/users/:id'
export const updateUser = async (request: Request, response: Response) => {
    const update = await getRepository(User).update(request.params.id, request.body);
    if(update.affected){
        const user = await getRepository(User).findOne(request.params.id);
        return response.json(user)
    }
    throw new Error('não foi possível atualizar o usuário, tente novamente.')
    
};


//DELETE '/users/:id'
export const deleteUser = async (request: Request, response: Response) => {
    const deletion = await getRepository(User).delete(request.params.id);
    if(deletion.affected){
        const user = await getRepository(User).findOne(request.params.id);
        return response.json(user)
    }
    throw new Error('não foi possível deletar o usuário, tente novamente.')
    
};