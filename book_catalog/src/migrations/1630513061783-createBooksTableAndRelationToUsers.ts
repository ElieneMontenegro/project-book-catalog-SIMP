import {MigrationInterface, QueryRunner} from "typeorm";

export class createBooksTableAndRelationToUsers1630513061783 implements MigrationInterface {
    name = 'createBooksTableAndRelationToUsers1630513061783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "author" character varying NOT NULL, "publisher" character varying NOT NULL, "edition" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_bb8627d137a861e2d5dc8d1eb20" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_bb8627d137a861e2d5dc8d1eb20"`);
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
