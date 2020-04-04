import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { CommandoClient as Client, CommandoMessage } from 'discord.js-commando';
import { MessageReaction, User, Guild } from 'discord.js';
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
    console.log(`Logged in as ${this.user.tag}`);
    setInterval(() => {
      const count = this.guilds.cache.size;
      const servers: string[] = [...this.guilds.cache.values()].map((guild: Guild) => guild.name);
      writeFileSync(resolve(process.cwd(), 'servers.txt'), servers.join("\n"));
      this.user.setActivity(`!mbti - Determining your MBTI Type. Active on ${count} servers`);
    }, 10000);
  }
}
