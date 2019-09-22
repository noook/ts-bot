import { CommandoClient as Client, CommandoMessage } from 'discord.js-commando';
import { MessageReaction, User } from 'discord.js';
import { CommandoClientOptions } from 'types/options';
import ReactionHelper from '@/helper/reaction-helper';

export default class Bot extends Client {
  private config: CommandoClientOptions;

  constructor(config: CommandoClientOptions) {
    super({ owner: config.owner });
    this.config = config;
  }

  public start(): this
  {
    this.login(this.config.token);
    this.on('ready', this.greet);
    this.on('error', console.error);
    this.on('reconnecting', () => console.log('Reconnecting ...'));
    this.on('disconnect', () => console.warn('Disconnected'));
    this.on('messageReactionAdd', (reaction: MessageReaction, user: User) => {
      if (user.bot || reaction.message.author.id !== this.user.id) return;

      ReactionHelper.handleReaction(reaction, user);
    });

    return this;
  }

  greet(): void {
    console.log(`Logged in as ${this.user.tag}`)
  }
}