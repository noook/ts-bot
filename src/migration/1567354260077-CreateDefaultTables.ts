import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDefaultTables1567354260077 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "mbti_answer" ("id" SERIAL NOT NULL, "step" integer NOT NULL, "value" character varying, "question" integer NOT NULL, "testId" integer, CONSTRAINT "PK_c3c1f4513db4a4ba58896e47b01" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "mbti_test" ("id" SERIAL NOT NULL, "step" integer NOT NULL, "completed" boolean NOT NULL, "result" character varying, "e" integer, "i" integer, "n" integer, "s" integer, "t" integer, "f" integer, "j" integer, "p" integer, "completedAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_653d1fa12a7fcf8e5fcd520c666" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "discord_user" ("id" SERIAL NOT NULL, "discordId" character varying NOT NULL, "tag" character varying NOT NULL, "locale" character varying, "lastActive" TIMESTAMP NOT NULL, CONSTRAINT "PK_2c465db058d41ca3a50f819b0a1" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "mbti_question" ("id" SERIAL NOT NULL, "step" integer NOT NULL, "key" character varying NOT NULL, "value" character varying, CONSTRAINT "PK_eef0caef161e2b4d816713400cf" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "mbti_answer" ADD CONSTRAINT "FK_361741af16784a144cf0246426d" FOREIGN KEY ("testId") REFERENCES "mbti_test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "mbti_test" ADD CONSTRAINT "FK_e26102d2a1c7d2568bd89a401e1" FOREIGN KEY ("userId") REFERENCES "discord_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "mbti_test" DROP CONSTRAINT "FK_e26102d2a1c7d2568bd89a401e1"`);
    await queryRunner.query(`ALTER TABLE "mbti_answer" DROP CONSTRAINT "FK_361741af16784a144cf0246426d"`);
    await queryRunner.query(`DROP TABLE "mbti_question"`);
    await queryRunner.query(`DROP TABLE "discord_user"`);
    await queryRunner.query(`DROP TABLE "mbti_test"`);
    await queryRunner.query(`DROP TABLE "mbti_answer"`);
  }
}
