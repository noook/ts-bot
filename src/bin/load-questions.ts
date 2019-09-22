import { getCustomRepository } from 'typeorm';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { BaseCommandRequirement, BaseCommand } from '@/bin/base-command';
import { MbtiQuestionRepository } from '@/repository';
import { QuestionBase } from '@/types/mbti';
import { TranslatorLangs } from '@/translations';

export default class LoadQuestionsCommand extends BaseCommand implements BaseCommandRequirement {

  public alias = 'questions:load';

  public async run(): Promise<void> {
    await this.setup();
    const questionRepository = getCustomRepository(MbtiQuestionRepository);
    const { questions } = await import(`${process.cwd()}/resources/questions.json`);
    await questionRepository.loadQuestions(questions);

    const json = {
      fr: {},
      en: {},
    };

    questions.forEach((couple: [QuestionBase, QuestionBase], index: number) => {
      const [left, right] = couple;
      index += 1;

      json.fr[index] = {
        left: left.label[TranslatorLangs.FR],
        right: right.label[TranslatorLangs.FR]
      };

      json.en[index] = {
        left: left.label[TranslatorLangs.EN],
        right: right.label[TranslatorLangs.EN],
      };
    });
    Object.keys(json).forEach((lang: string) => {
      const file = resolve(`${process.cwd()}/src/translations/questions.${lang}.json`);
      writeFileSync(file, JSON.stringify(json[lang], null, 2));
    });
  }  
}
