import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Book } from "../entities/Book";
import { User } from "../entities/User";

//definir tipagens

//GET '/users/:id/books'
export const getUserBooks = async (request: Request, response: Response) => {
  const books = await getRepository(Book).find({
    where: { user: { id: request.params.id } },
  });
  return response.json(books);
};

//GET '/books/:bookId'
export const getBook = async (request: Request, response: Response) => {
  const book = await getRepository(Book).findOne(request.params.bookId);
  return response.json(book);
};

//POST '/users/:id/books'
export const createBook = async (request: Request, response: Response) => {
  const user = await getRepository(User).findOne(request.params.id);

  const book = await getRepository(Book).save({ ...request.body, user });
  return response.json(book);
};

//UPDATE '/books/:bookId'
export const updateBook = async (request: Request, response: Response) => {
  const update = await getRepository(Book).update(
    request.params.bookId,
    request.body
  );
  if (update.affected) {
    const book = await getRepository(Book).findOne(request.params.bookId);
    return response.json(book);
  }
  throw new Error("não foi possível atualizar o livro, tente novamente.");
};

//DELETE '/books/:id'
export const deleteBook = async (request: Request, response: Response) => {
  const book = await getRepository(Book).findOne(request.params.id);

  const deletion = await getRepository(Book).delete(request.params.id);
  if (deletion.affected) {
    return response.json({ message: "Livro deletado", Book });
  }
  throw new Error("não foi possível deletar o livro, tente novamente.");
};
