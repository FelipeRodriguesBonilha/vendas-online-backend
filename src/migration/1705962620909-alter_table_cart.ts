import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterTableCart1705962620909 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE cart ADD active boolean NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TBALE cart DROP active;
        `);
    }

}
