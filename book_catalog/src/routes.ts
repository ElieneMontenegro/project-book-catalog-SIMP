import { Router, Request, Response } from "express";

const routes = Router();
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/UserController";

import {
  getUserBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "./controllers/BookController";

routes.get("/", (request: Request, response: Response) => {
  return response.json({ message: "hello world!" });
});

routes.get("/users", getAllUsers);
routes.get("/users/:id", getUser);
routes.post("/users", createUser);
routes.put("/users/:id", updateUser);
routes.delete("/users/:id", deleteUser);

routes.get("/users/:id/books", getUserBooks);
routes.get("/books/:bookId", getBook);
routes.post("/users/:id/books", createBook);
routes.put("/books/:bookId", updateBook);
routes.delete("/books/:id", deleteBook);

export default routes;
