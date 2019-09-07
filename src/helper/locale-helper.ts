import { MessageEmbed, User, MessageReaction, Emoji } from 'discord.js';
import { getCustomRepository } from 'typeorm';
import { DiscordUserRepository } from '@/repository';
import Translator, { TranslatorLangs } from '@/translations';
import EventHandler from '@/helper/event-handler';

enum AvailableLangs {
  FR = '🇫🇷',
  EN = '🇺🇸',
}

type FlagToCode = {
  [key in AvailableLangs]: string;
}

class MiscHelper {
  private discordUserRepository: DiscordUserRepository;
  private languages: FlagToCode = {
    '🇫🇷': 'fr',
    '🇺🇸': 'en',
  }

  constructor() {
    EventHandler.ormReady(() => {
      this.discordUserRepository = getCustomRepository(DiscordUserRepository);
    });
  }

  public async askLocale(user: User) {
    const embed = new MessageEmbed()
      .setTitle('Language choice')
      .setDescription('Please select the language in which you want me to to speak with you in direct messages')
      .setColor('#a55eea')
      .setFooter('mbti-lang');

    const message = await user.send(embed);
    const languages = Object.values(AvailableLangs);

    for (let i = 0; i < languages.length; i += 1) {
      await message.react(languages[i]);
    }

    const filter = (reaction: MessageReaction, user: User) => {
      return !user.bot && languages.includes(reaction.emoji.name as AvailableLangs);
    }

    const lang: string = await message.awaitReactions(filter, { max: 1 })
        .then(collected => this.languages[collected.entries().next().value[0]].toUpperCase())
        .catch(err => console.error);

    const discordUser = await this.discordUserRepository.findOne({ discordId: user.id });
    discordUser.locale = lang;

    await this.discordUserRepository.save(discordUser);
    await user.send(Translator.trans(TranslatorLangs[lang], 'common.letstalkx'));
  }
}

export default new MiscHelper;
