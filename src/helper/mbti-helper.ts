import { MessageEmbed, User, MessageReaction, Message } from 'discord.js';
import { getCustomRepository } from 'typeorm';
import { MbtiTestRepository, MbtiAnswerRepository, MbtiQuestionRepository } from '@/repository';
import { DiscordUser, MbtiTest, MbtiAnswer, MbtiQuestion } from '@/entity';
import EventHandler from '@/helper/event-handler';
import Translator, { TranslatorLangs } from '@/translations';
import { HandlerColor } from './reaction-helper';
import { shuffle } from '@/utils';
import { Dichotomy, DichotomyCouple } from '@/types/mbti';
import { config } from '@/config';

export enum MbtiEmojiAnswer {
  KIWI = '🥝',
  WATERMELOON = '🍉',
  APPLE = '🍎',
  PEACH = '🍑',
  PINEAPPLE = '🍍',
  BANANA = '🍌',
  CHERRY = '🍒',
}

enum TestActions {
  RESET = '🗑',
  RESUME = '➡',
}

type EmojiToAction = {
  [key in TestActions]: string;
}

class MbtiHelper {
  private testRepository: MbtiTestRepository;
  private answerRepository: MbtiAnswerRepository;
  private questionRepository: MbtiQuestionRepository;

  private actions: EmojiToAction = {
    '🗑': 'reset',
    '➡': 'resume',
  }

  constructor() {
    EventHandler.ormReady(() => {
      this.testRepository = getCustomRepository(MbtiTestRepository);
      this.answerRepository = getCustomRepository(MbtiAnswerRepository);
      this.questionRepository = getCustomRepository(MbtiQuestionRepository);
    });
  }

  public isAnswerValid(emoji: string): boolean {
    return Object.values(MbtiEmojiAnswer).includes(emoji as MbtiEmojiAnswer);
  }

  public createTest(user: DiscordUser): Promise<MbtiTest> {
    return this.testRepository.createTest(user);
  }

  public currentTest(user: DiscordUser) {
    return this.testRepository.currentTest(user);
  }

  public async resetOrResume(user: User, test: MbtiTest): Promise<MbtiTest> {
    const locale = test.user.locale;
    const embed = new MessageEmbed()
      .setTitle(Translator.trans(TranslatorLangs[locale], 'mbti.testAlreadyStartedTitle'))
      .setDescription(Translator.trans(TranslatorLangs[locale], 'mbti.testAlreadyStarted'))
      .setColor('#a55eea')
      .setFooter('mbti-resume-test');

    const message = await user.send(embed);
    const actions = Object.values(TestActions);

    for (let i = 0; i < actions.length; i += 1) {
      await message.react(actions[i]);
    }

    const filter = (reaction: MessageReaction, user: User) => {
      return !user.bot && actions.includes(reaction.emoji.name as TestActions);
    }

    const action: string = await message.awaitReactions(filter, { max: 1 })
      .then(collected => this.actions[collected.firstKey()])
      .catch(err => console.error);

    switch (action) {
      case 'resume':
        return test;
    
      case 'reset':
        return this.testRepository.resetTest(test);
    }
  }

  /**
   * @todo Split ask / answer
   */
  public async askQuestion(test: MbtiTest, user: User) {
    test = await this.testRepository.findOne(test.id, { relations: ['answers', 'user'] });
    const answer: MbtiAnswer = test.answers.find((el: MbtiAnswer) => el.step === test.step);
    const [leftAnswer, rightAnswer] = await this.questionRepository.find({ number: answer.question })
      .then((questions: [MbtiQuestion, MbtiQuestion]) => questions.sort((a, b) => a.key === 'left' ? -1 : 1));
    const [leftEmoji, rightEmoji] = shuffle(Object.values(MbtiEmojiAnswer));

    const answers = {
      left: {
        emoji: leftEmoji,
        value: leftAnswer.value,
      },
      right: {
        emoji: rightEmoji,
        value: rightAnswer.value,
      },
    };
    
    const questions = Translator.trans(TranslatorLangs[test.user.locale], `mbtiQuestion.${test.currentTest().question}`) as any;
    const embed = new MessageEmbed()
      .setColor(HandlerColor.MBTI_ANSWER)
      .setFooter('mbti-question')
      .setTitle(`Question ${test.step} / ${config.test.length}`)
      .addField(leftEmoji, questions.left)
      .addField(rightEmoji, questions.right);

    const msg = await user.send(embed);

    await msg.react(leftEmoji);
    await msg.react(rightEmoji);
    const filter = (reaction: MessageReaction, user: User) => {
      return !user.bot && [leftEmoji, rightEmoji].includes(reaction.emoji.name as MbtiEmojiAnswer);
    }

    const emojiAnswer = await msg.awaitReactions(filter, { max: 1 })
      .then(collected => collected.firstKey())
      .catch(err => console.error);

    const { value } = Object.values(answers).find(el => el.emoji === emojiAnswer);
    const ended = await this.saveAnswer(test, value);

    if (!ended) {
      return this.askQuestion(test, user);
    }

    return this.endTest(test, user);
  }

  private async saveAnswer(test: MbtiTest, value: Dichotomy): Promise<boolean>{
    let ended: boolean = false;
    const answer = test.answers.find((el: MbtiAnswer) => el.step === test.step);
    answer.value = value;
    test.step += 1;

    if (test.step > config.test.length) {
      test.completed = true;
      test.completedAt = new Date();
      ended = true;
    }

    await this.answerRepository.manager.save([test, answer]);

    return ended;
  }

  public async answerQuestion(reaction: MessageReaction, user: User) {
    // console.log(reaction, user);
  } 

  private async endTest(test: MbtiTest, user: User) {
    this.calculate(test);
    const locale = TranslatorLangs[test.user.locale];
    const type = test.result;
    const messages = [
      Translator.trans(locale, 'mbti.typeResult', { type }),
      Translator.trans(locale, 'mbti.akaBase', { alias: Translator.trans(locale, `mbti.typeAka.${type}`)}),
      Translator.trans(locale, `mbti.summaries.${type}`),
      Translator.trans(locale, `mbti.detailLink`, { type }),
    ];
    await user.send(messages.join("\n\n"));
  }

  private calculate(test: MbtiTest) {
    const store = { i: 0, e: 0, s: 0, n: 0, t: 0, f: 0, p: 0, j: 0 };

    const answers: Dichotomy[] = test.answers.map((answer: MbtiAnswer) => answer.value);
    answers.forEach((answer: Dichotomy) => store[answer.toLowerCase()] += 1);
    const pairs: DichotomyCouple[] = [['I', 'E'], ['N', 'S'], ['T', 'F'], ['P', 'J']];

    let result: string = '';
    pairs.forEach((couple: DichotomyCouple) => {
      result += couple.sort((a: Dichotomy, b: Dichotomy) => store[b.toLowerCase()] - store[a.toLowerCase()]).shift();
    });
    test.result = result;

    Object.entries(store).forEach(([letter, value]) => {
      test[letter] = value;
    });

    this.testRepository.manager.save(test);
  }
}

export default new MbtiHelper;
