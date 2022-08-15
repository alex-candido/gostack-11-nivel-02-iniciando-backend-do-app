import { MigrationInterface, QueryRunner } from "typeorm";

export class default1660583756405 implements MigrationInterface {
    name = 'default1660583756405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "created_at"`);
    }

}
