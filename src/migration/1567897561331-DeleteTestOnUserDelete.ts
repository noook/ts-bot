import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteTestOnUserDelete1567897561331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "mbti_test" DROP CONSTRAINT "FK_e26102d2a1c7d2568bd89a401e1"`);
        await queryRunner.query(`ALTER TABLE "mbti_test" ADD CONSTRAINT "FK_e26102d2a1c7d2568bd89a401e1" FOREIGN KEY ("userId") REFERENCES "discord_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "mbti_test" DROP CONSTRAINT "FK_e26102d2a1c7d2568bd89a401e1"`);
        await queryRunner.query(`ALTER TABLE "mbti_test" ADD CONSTRAINT "FK_e26102d2a1c7d2568bd89a401e1" FOREIGN KEY ("userId") REFERENCES "discord_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
