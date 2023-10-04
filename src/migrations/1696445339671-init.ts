import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1696445339671 implements MigrationInterface {
  name = 'Init1696445339671';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(500) NOT NULL, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(500) NOT NULL, CONSTRAINT "UQ_f0336eb8ccdf8306e270d400cf0" UNIQUE ("name"), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "color" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_229c1a96f14d7187fccf3684ecc" UNIQUE ("name"), CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."network_name_enum" AS ENUM('LinkedIn', 'GitHub', 'Website')`,
    );
    await queryRunner.query(
      `CREATE TABLE "network" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" "public"."network_name_enum" NOT NULL, "url" character varying NOT NULL, "profile_id" uuid, "company_id" uuid, CONSTRAINT "PK_8f8264c2d37cbbd8282ee9a3c97" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(300) NOT NULL, "profession" character varying(300) NOT NULL, "user_id" uuid, CONSTRAINT "REL_d752442f45f258a8bdefeebb2f" UNIQUE ("user_id"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, CONSTRAINT "UQ_0f49a593960360f6f85b692aca8" UNIQUE ("name"), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."occupations_skills_level_enum" AS ENUM('INTERMEDIATE', 'BASIC', 'ADVANCED', 'EXPERT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "occupations_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "level" "public"."occupations_skills_level_enum" NOT NULL DEFAULT 'BASIC', "occupation_id" uuid, "skill_id" uuid, CONSTRAINT "PK_31cc173ea7347960d50c4292df8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "occupation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(300) NOT NULL, CONSTRAINT "UQ_47dc90a06f122e0b7256fa1e5fd" UNIQUE ("name"), CONSTRAINT "PK_07cfcefef555693d96dce8805c5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_occupations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "years_experience" smallint DEFAULT '0', "months_experience" smallint DEFAULT '0', "user_id" uuid, "occupation_id" uuid, CONSTRAINT "PK_d48c125cd898121dbf9eaca8fe9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."vacancy_status_enum" AS ENUM('PENDING', 'APPLIED', 'NO_RESPONSE', 'TECHNICAL_TEST', 'INTERVIEW', 'OFFER', 'REJECTED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "vacancy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "postUrl" character varying NOT NULL, "salary" character varying(255) NOT NULL, "jobDescription" character varying(2000) NOT NULL, "status" "public"."vacancy_status_enum" NOT NULL, "company_id" uuid, "job_id" uuid, "location_id" uuid, "color_id" uuid, CONSTRAINT "PK_8fa1981f63bc24e1712707d492b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, CONSTRAINT "UQ_a76c5cd486f7779bd9c319afd27" UNIQUE ("name"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_vacancies" ("user_id" uuid NOT NULL, "vacancy_id" uuid NOT NULL, CONSTRAINT "PK_7a67dec3ec238ae9c0f89ba2c5d" PRIMARY KEY ("user_id", "vacancy_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_88bfb7b9f90386c7401fd29827" ON "user_vacancies" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3f62a84ec3aa26d8ece4a76312" ON "user_vacancies" ("vacancy_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "network" ADD CONSTRAINT "FK_06077802d7c3c70128548814c08" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "network" ADD CONSTRAINT "FK_dcec79911dfa588c48526b0106b" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "occupations_skills" ADD CONSTRAINT "FK_f56700053b9726ddec40ac0d455" FOREIGN KEY ("occupation_id") REFERENCES "occupation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "occupations_skills" ADD CONSTRAINT "FK_aacc01b1682109e89e4fd077b4d" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_occupations" ADD CONSTRAINT "FK_c884d18b03e6220434c3c92b8f5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_occupations" ADD CONSTRAINT "FK_60ecd28b9d06e9f64363e5b32db" FOREIGN KEY ("occupation_id") REFERENCES "occupation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy" ADD CONSTRAINT "FK_461db2c402fb48580c89b26017c" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy" ADD CONSTRAINT "FK_565a3005b17b601dba5750d4685" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy" ADD CONSTRAINT "FK_9a5090017c31176ce8651d319bb" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy" ADD CONSTRAINT "FK_ca3db66b8eb4959700c8a11a934" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_vacancies" ADD CONSTRAINT "FK_88bfb7b9f90386c7401fd298274" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_vacancies" ADD CONSTRAINT "FK_3f62a84ec3aa26d8ece4a763122" FOREIGN KEY ("vacancy_id") REFERENCES "vacancy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_vacancies" DROP CONSTRAINT "FK_3f62a84ec3aa26d8ece4a763122"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_vacancies" DROP CONSTRAINT "FK_88bfb7b9f90386c7401fd298274"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy" DROP CONSTRAINT "FK_ca3db66b8eb4959700c8a11a934"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy" DROP CONSTRAINT "FK_9a5090017c31176ce8651d319bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy" DROP CONSTRAINT "FK_565a3005b17b601dba5750d4685"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy" DROP CONSTRAINT "FK_461db2c402fb48580c89b26017c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_occupations" DROP CONSTRAINT "FK_60ecd28b9d06e9f64363e5b32db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_occupations" DROP CONSTRAINT "FK_c884d18b03e6220434c3c92b8f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "occupations_skills" DROP CONSTRAINT "FK_aacc01b1682109e89e4fd077b4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "occupations_skills" DROP CONSTRAINT "FK_f56700053b9726ddec40ac0d455"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "network" DROP CONSTRAINT "FK_dcec79911dfa588c48526b0106b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "network" DROP CONSTRAINT "FK_06077802d7c3c70128548814c08"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3f62a84ec3aa26d8ece4a76312"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_88bfb7b9f90386c7401fd29827"`,
    );
    await queryRunner.query(`DROP TABLE "user_vacancies"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "vacancy"`);
    await queryRunner.query(`DROP TYPE "public"."vacancy_status_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "users_occupations"`);
    await queryRunner.query(`DROP TABLE "occupation"`);
    await queryRunner.query(`DROP TABLE "occupations_skills"`);
    await queryRunner.query(
      `DROP TYPE "public"."occupations_skills_level_enum"`,
    );
    await queryRunner.query(`DROP TABLE "skill"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "network"`);
    await queryRunner.query(`DROP TYPE "public"."network_name_enum"`);
    await queryRunner.query(`DROP TABLE "color"`);
    await queryRunner.query(`DROP TABLE "location"`);
    await queryRunner.query(`DROP TABLE "job"`);
  }
}
