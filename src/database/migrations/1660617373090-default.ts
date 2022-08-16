import { MigrationInterface, QueryRunner } from "typeorm";

export class default1660617373090 implements MigrationInterface {
    name = 'default1660617373090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "provider_id" uuid, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "fk_provider_id" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "fk_provider_id"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
    }

}
