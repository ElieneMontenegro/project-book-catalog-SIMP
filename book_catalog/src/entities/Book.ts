import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    publisher: string;

    @Column()
    edition: string;

}
