import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1695437625091 implements MigrationInterface {
    name = 'Init1695437625091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "profession" character varying(300) NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_0f49a593960360f6f85b692aca8" UNIQUE ("name"), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "profile_id" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_f44d0cd18cfd80b0fed7806c3b" UNIQUE ("profile_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "occupation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "years_experience" smallint DEFAULT '0', "months_experience" smallint DEFAULT '0', "professionalId" uuid NOT NULL, "professional_id" uuid, CONSTRAINT "UQ_47dc90a06f122e0b7256fa1e5fd" UNIQUE ("name"), CONSTRAINT "PK_07cfcefef555693d96dce8805c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "occupation_skill" ("occupation_id" uuid NOT NULL, "skill_id" integer NOT NULL, CONSTRAINT "PK_867fc3a1e2d2ac5bed411887a99" PRIMARY KEY ("occupation_id", "skill_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9d5e716600e43bc52db032044a" ON "occupation_skill" ("occupation_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_67d6851171702542b60b42b2c1" ON "occupation_skill" ("skill_id") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occupation" ADD CONSTRAINT "FK_c9a6e041da9c7d4765f49e1481a" FOREIGN KEY ("professional_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occupation_skill" ADD CONSTRAINT "FK_9d5e716600e43bc52db032044ad" FOREIGN KEY ("occupation_id") REFERENCES "occupation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "occupation_skill" ADD CONSTRAINT "FK_67d6851171702542b60b42b2c1f" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "occupation_skill" DROP CONSTRAINT "FK_67d6851171702542b60b42b2c1f"`);
        await queryRunner.query(`ALTER TABLE "occupation_skill" DROP CONSTRAINT "FK_9d5e716600e43bc52db032044ad"`);
        await queryRunner.query(`ALTER TABLE "occupation" DROP CONSTRAINT "FK_c9a6e041da9c7d4765f49e1481a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67d6851171702542b60b42b2c1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d5e716600e43bc52db032044a"`);
        await queryRunner.query(`DROP TABLE "occupation_skill"`);
        await queryRunner.query(`DROP TABLE "occupation"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
