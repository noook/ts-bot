import { CommandoClient as Client, CommandoMessage } from 'discord.js-commando';
import { MessageReaction, User } from 'discord.js';
import { CommandoClientOptions } from 'types/options';

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
    this.on('messageReactionAdd', (reaction: MessageReaction, user: User) => {});

    return this;
  }

  greet(): void
  {
    const { username, discriminator } = this.user;
    console.log(`Logged in as ${username}#${discriminator}`)
  }
}