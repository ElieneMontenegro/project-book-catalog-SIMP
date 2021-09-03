import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Book } from "../entities/Book";
import { User } from "../entities/User";
import { BookCreateRequest, BookUpdateRequest } from "../types/Book";
import { v4 as uuid } from "uuid";

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

export const updateBook = async (
  id: string,
  bookId: string,
  book: BookUpdateRequest
): Promise<Book> => {
  const user = await getRepository(User).findOne(id);
  const update = await getRepository(Book).update(bookId, { ...book, user });

  if (update.affected) {
    return getRepository(Book).findOne(bookId);
  }
  throw new Error("não foi possível encontrar o usuário, tente novamente.");
};

export const deleteBook = async (id: string) => {
  const book = await getRepository(Book).findOne(id);

  const deletion = await getRepository(Book).delete(id);
  if (!deletion.affected) {
    throw new Error("não foi possível deletar o livro, tente novamente.");
  }
  return book;
};
