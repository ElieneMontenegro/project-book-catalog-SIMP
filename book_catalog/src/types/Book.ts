import { User } from "../entities/User";

export interface BookInterface {
  id: string;
  title: string;
  author: string;
  publisher: string;
  edition: number;
  book: User;
}
