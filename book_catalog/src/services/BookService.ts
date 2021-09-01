import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Book } from "../entities/Book";
import { User } from "../entities/User";
import { validateUpdateBookInfo } from "../helpers/validations";
import { BookCreateRequest, BookUpdateRequest } from "../types/Book";

export const getUserBooks = async (userId: string): Promise<Book[]> => {
  return getRepository(Book).find({
    where: { user: { id: userId } },
  });
};

export const getBook = async (bookId: string): Promise<Book> => {
  return getRepository(Book).findOne(bookId);
};

export const createBook = async (
  userId: string,
  book: BookCreateRequest
): Promise<Book> => {
  const user = await getRepository(User).findOne(userId);

  return getRepository(Book).save({ ...book, user });
};

// having trouble with this method
export const updateBook = async (
  id: string,
  bookRequest: BookUpdateRequest
): Promise<Book> => {
  const book = validateUpdateBookInfo(bookRequest);

  const update = await getRepository(Book).update(id, book);

  if (update.affected) {
    return getRepository(Book).findOne(id);
  }
  throw new Error("não foi possível atualizar o livro, tente novamente.");
};

export const deleteBook = async (id: string) => {
  const book = await getRepository(Book).findOne(id);

  const deletion = await getRepository(Book).delete(id);
  if (!deletion.affected) {
    throw new Error("não foi possível deletar o livro, tente novamente.");
  }
};
