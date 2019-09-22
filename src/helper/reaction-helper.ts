import { MessageReaction, User } from "discord.js";
import MbtiHelper from '@/helper/mbti-helper';

export enum HandlerColor {
  MBTI_ANSWER = '#6bb9f0',
}

type ReactionHandler = {
  [key in HandlerColor]: (reaction: MessageReaction, user: User) => any
}

class ReactionHelper {
  private handlers: ReactionHandler = {
    [HandlerColor.MBTI_ANSWER]: MbtiHelper.answerQuestion,
  };

  handleReaction(reaction: MessageReaction, user: User) {
    const embeds = reaction.message.embeds;

    if (!embeds.length) return;

    const [embed] = embeds;

    const handler = this.handlers[embed.hexColor];
    if (handler) {
      handler(reaction, user);
    }
  }
}

export default new ReactionHelper;
