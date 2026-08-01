/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class ModifyEntityUuid1785569284644 {
    name = 'ModifyEntityUuid1785569284644'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        // uuid 主鍵需要這個 extension
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        // 先拆掉舊表的外鍵與舊表（USERS / SKILLS / COURSES）
        await queryRunner.query(`ALTER TABLE "COURSES" DROP CONSTRAINT "FK_e4c9d442af9b7e830f2b642a487"`);
        await queryRunner.query(`ALTER TABLE "COURSES" DROP CONSTRAINT "FK_90caed560680c5028fbda2541b0"`);
        await queryRunner.query(`DROP TABLE "COURSES"`);
        await queryRunner.query(`DROP TABLE "SKILLS"`);
        await queryRunner.query(`DROP TABLE "USERS"`);

        // 再建正確的單數表名 + uuid 主鍵
        await queryRunner.query(`CREATE TABLE "USER" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(320) NOT NULL, "role" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c090db0477be7a25259805e37c2" UNIQUE ("email"), CONSTRAINT "PK_480564dbef3c7391661ce3b9d5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "SKILL" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_0780a3ef1d521b8bee1c9b240de" UNIQUE ("name"), CONSTRAINT "PK_90109ddb53b4c7cf8efe1efad0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "COURSE" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text NOT NULL, "start_at" TIMESTAMP NOT NULL, "end_at" TIMESTAMP NOT NULL, "max_participants" integer NOT NULL, "meeting_url" character varying(2048), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "skill_id" uuid, CONSTRAINT "PK_1dcd712a4d39dcfd9d46ca0ae11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD CONSTRAINT "FK_7c9837d128ab474cb3d409b448d" FOREIGN KEY ("user_id") REFERENCES "USER"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "COURSE" ADD CONSTRAINT "FK_10d952a5e55998cf12f448fcfab" FOREIGN KEY ("skill_id") REFERENCES "SKILL"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        // 還原：丟掉新表，重建舊表（含 AddMeetingUrl 之後的 meeting_url）
        await queryRunner.query(`ALTER TABLE "COURSE" DROP CONSTRAINT "FK_10d952a5e55998cf12f448fcfab"`);
        await queryRunner.query(`ALTER TABLE "COURSE" DROP CONSTRAINT "FK_7c9837d128ab474cb3d409b448d"`);
        await queryRunner.query(`DROP TABLE "COURSE"`);
        await queryRunner.query(`DROP TABLE "SKILL"`);
        await queryRunner.query(`DROP TABLE "USER"`);

        await queryRunner.query(`CREATE TABLE "USERS" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(320) NOT NULL, "role" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a1689164dbbcca860ce6d17b2e1" UNIQUE ("email"), CONSTRAINT "PK_b16c39a00c89083529c6166fa5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "SKILLS" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_4834833d62b3d8a04ff8b6be984" UNIQUE ("name"), CONSTRAINT "PK_3e5ba8fc2ab5d996f932af9027c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "COURSES" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "start_at" TIMESTAMP NOT NULL, "end_at" TIMESTAMP NOT NULL, "max_participants" integer NOT NULL, "meeting_url" character varying(2048), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "skill_id" integer, CONSTRAINT "PK_27fddb82290e2c8378be8159ef8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "COURSES" ADD CONSTRAINT "FK_90caed560680c5028fbda2541b0" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "COURSES" ADD CONSTRAINT "FK_e4c9d442af9b7e830f2b642a487" FOREIGN KEY ("skill_id") REFERENCES "SKILLS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
