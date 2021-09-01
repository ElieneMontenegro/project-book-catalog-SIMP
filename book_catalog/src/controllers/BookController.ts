import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Book } from "../entities/Book";
import { User } from "../entities/User";
import * as BookService from "../services/BookService";

//GET '/users/:id/books'
export const getUserBooks = async (request: Request, response: Response) => {
  try {
    const books = await BookService.getUserBooks(request.params.id);
    response.status(200).send(books);
  } catch (error) {
    response.status(404).send(error.message);
  }
};

//GET '/books/:bookId'
export const getBook = async (request: Request, response: Response) => {
  try {
    const books = await BookService.getBook(request.params.id);
    response.status(200).send(books);
  } catch (error) {
    response.status(404).send(error.message);
  }
};

//POST '/users/:id/books'
export const createBook = async (request: Request, response: Response) => {
  try {
    const books = await BookService.createBook(request.params.id, request.body);
    response.status(200).send(books);
  } catch (error) {
    response.status(404).send(error.message);
  }
};

//UPDATE '/books/:bookId'
export const updateBook = async (request: Request, response: Response) => {
  try {
    const books = await BookService.updateBook(request.params.id, request.body);
    response.status(200).send(books);
  } catch (error) {
    response.status(404).send(error.message);
  }
};

//DELETE '/books/:bookId'
export const deleteBook = async (request: Request, response: Response) => {
  try {
    const books = await BookService.deleteBook(request.params.id);
    response.status(200).send(books);
  } catch (error) {
    response.status(404).send(error.message);
  }
};
