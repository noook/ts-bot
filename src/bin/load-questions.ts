import { getCustomRepository } from 'typeorm';
import { BaseCommandRequirement, BaseCommand } from './base-command';
import { MbtiQuestionRepository } from '@/repository';

export default class LoadQuestionsCommand extends BaseCommand implements BaseCommandRequirement {

  public alias = 'questions:load';

  public async run(): Promise<void> {
    await this.setup();
    const questionRepository = getCustomRepository(MbtiQuestionRepository);
    const { questions } = await import(`${process.cwd()}/resources/questions.json`);
    console.log(questions);
    // await questionRepository.loadQuestions(questions);
  }  
}

