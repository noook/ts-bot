import { EntityRepository, Repository } from 'typeorm';
import { User } from 'discord.js';
import { MbtiQuestion } from '@/entity';
import { QuestionsToLoad, QuestionBase } from '@/types/mbti';

@EntityRepository(MbtiQuestion)
export class MbtiQuestionRepository extends Repository<MbtiQuestion> {

  public async loadQuestions(questions: QuestionsToLoad) {
    const toSave: MbtiQuestion[] = [];
    // questions.forEach((question, index: number) => {
    //   question.forEach((choice: QuestionBase) => {
    //     toSave.push(new MbtiQuestion({ ...choice, index }));
    //   });
    // });
    console.log(toSave);
  }
}
