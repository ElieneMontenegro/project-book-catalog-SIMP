import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Book } from "./Book";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    profilePic: string;

    @OneToMany(() => Book, book => book.id)
    books: Book[]
}
