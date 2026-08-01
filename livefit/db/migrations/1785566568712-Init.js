/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Init1785566568712 {
    name = 'Init1785566568712'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "USERS" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(320) NOT NULL, "role" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a1689164dbbcca860ce6d17b2e1" UNIQUE ("email"), CONSTRAINT "PK_b16c39a00c89083529c6166fa5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "SKILLS" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_4834833d62b3d8a04ff8b6be984" UNIQUE ("name"), CONSTRAINT "PK_3e5ba8fc2ab5d996f932af9027c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "COURSES" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "start_at" TIMESTAMP NOT NULL, "end_at" TIMESTAMP NOT NULL, "max_participants" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "skill_id" integer, CONSTRAINT "PK_27fddb82290e2c8378be8159ef8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "COURSES" ADD CONSTRAINT "FK_90caed560680c5028fbda2541b0" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "COURSES" ADD CONSTRAINT "FK_e4c9d442af9b7e830f2b642a487" FOREIGN KEY ("skill_id") REFERENCES "SKILLS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "COURSES" DROP CONSTRAINT "FK_e4c9d442af9b7e830f2b642a487"`);
        await queryRunner.query(`ALTER TABLE "COURSES" DROP CONSTRAINT "FK_90caed560680c5028fbda2541b0"`);
        await queryRunner.query(`DROP TABLE "COURSES"`);
        await queryRunner.query(`DROP TABLE "SKILLS"`);
        await queryRunner.query(`DROP TABLE "USERS"`);
    }
}
