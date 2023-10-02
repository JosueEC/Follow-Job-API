import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1696211882724 implements MigrationInterface {
    name = 'Init1696211882724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(300) NOT NULL, "profession" character varying(300) NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."network_name_enum" AS ENUM('LinkedIn', 'GitHub', 'Website')`);
        await queryRunner.query(`CREATE TABLE "network" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" "public"."network_name_enum" NOT NULL, "url" character varying NOT NULL, "profile_id" uuid, CONSTRAINT "PK_8f8264c2d37cbbd8282ee9a3c97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, CONSTRAINT "UQ_0f49a593960360f6f85b692aca8" UNIQUE ("name"), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."occupations_skills_level_enum" AS ENUM('INTERMEDIATE', 'BASIC', 'ADVANCED', 'EXPERT')`);
        await queryRunner.query(`CREATE TABLE "occupations_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "level" "public"."occupations_skills_level_enum" NOT NULL DEFAULT 'BASIC', "occupation_id" uuid, "skill_id" uuid, CONSTRAINT "PK_31cc173ea7347960d50c4292df8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "profile_id" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_f44d0cd18cfd80b0fed7806c3b" UNIQUE ("profile_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_occupations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "years_experience" smallint DEFAULT '0', "months_experience" smallint DEFAULT '0', "user_id" uuid, "occupation_id" uuid, CONSTRAINT "PK_d48c125cd898121dbf9eaca8fe9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "occupation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(300) NOT NULL, CONSTRAINT "UQ_47dc90a06f122e0b7256fa1e5fd" UNIQUE ("name"), CONSTRAINT "PK_07cfcefef555693d96dce8805c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "network" ADD CONSTRAINT "FK_06077802d7c3c70128548814c08" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occupations_skills" ADD CONSTRAINT "FK_f56700053b9726ddec40ac0d455" FOREIGN KEY ("occupation_id") REFERENCES "occupation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occupations_skills" ADD CONSTRAINT "FK_aacc01b1682109e89e4fd077b4d" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_occupations" ADD CONSTRAINT "FK_c884d18b03e6220434c3c92b8f5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_occupations" ADD CONSTRAINT "FK_60ecd28b9d06e9f64363e5b32db" FOREIGN KEY ("occupation_id") REFERENCES "occupation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_occupations" DROP CONSTRAINT "FK_60ecd28b9d06e9f64363e5b32db"`);
        await queryRunner.query(`ALTER TABLE "users_occupations" DROP CONSTRAINT "FK_c884d18b03e6220434c3c92b8f5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`ALTER TABLE "occupations_skills" DROP CONSTRAINT "FK_aacc01b1682109e89e4fd077b4d"`);
        await queryRunner.query(`ALTER TABLE "occupations_skills" DROP CONSTRAINT "FK_f56700053b9726ddec40ac0d455"`);
        await queryRunner.query(`ALTER TABLE "network" DROP CONSTRAINT "FK_06077802d7c3c70128548814c08"`);
        await queryRunner.query(`DROP TABLE "occupation"`);
        await queryRunner.query(`DROP TABLE "users_occupations"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "occupations_skills"`);
        await queryRunner.query(`DROP TYPE "public"."occupations_skills_level_enum"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "network"`);
        await queryRunner.query(`DROP TYPE "public"."network_name_enum"`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
