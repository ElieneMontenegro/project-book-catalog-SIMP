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

import multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({ destination: "imageUpload/" }),
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

routes.get("/", (request: Request, response: Response) => {
  return response.json({ message: "servidor rodando!" });
});

routes.get("/users", getAllUsers);
routes.get("/users/:id", getUser);
routes.post("/users", upload.single("profilePic"), createUser);
routes.put("/users/:id", updateUser);
routes.delete("/users/:id", deleteUser);

routes.get("/users/:id/books", getUserBooks);
routes.get("/books/:bookId", getBook);
routes.post("/users/:id/books", createBook);
routes.put("/books/:bookId", updateBook);
routes.delete("/books/:bookId", deleteBook);

export default routes;
