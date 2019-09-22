import { EntityRepository, Repository } from 'typeorm';
import { MbtiQuestion } from '@/entity';
import { QuestionsToLoad, QuestionBase } from '@/types/mbti';

@EntityRepository(MbtiQuestion)
export class MbtiQuestionRepository extends Repository<MbtiQuestion> {

  public async loadQuestions(questions: QuestionsToLoad): Promise<MbtiQuestion[]> {
    await this.clear();
    const toSave: MbtiQuestion[] = [];
    questions.forEach((question, index: number) => {
      question.forEach((choice: QuestionBase) => {
        toSave.push(new MbtiQuestion({ ...choice, index: index + 1 }));
      });
    });

    await this.manager.save(toSave);
    console.log(`Saved ${toSave.length / 2} questions in the database.`);

    return toSave;
  }
}
