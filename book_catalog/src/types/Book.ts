import { User } from "../entities/User";

export interface BookCreateRequest {
  title: string;
  author: string;
  publisher: string;
  edition: number;
  book: User;
}

export interface BookUpdateRequest {
  title?: string;
  author?: string;
  publisher?: string;
  edition?: number;
  book?: User;
}
