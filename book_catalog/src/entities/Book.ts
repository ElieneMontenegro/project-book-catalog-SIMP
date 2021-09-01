import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity('books')
export class Book {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    publisher: string;

    @Column()
    edition: number;

    @ManyToOne(() => User, user => user.books)
    user: User

}
