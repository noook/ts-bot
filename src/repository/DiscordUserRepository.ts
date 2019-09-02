import { EntityRepository, Repository } from 'typeorm';
import { User } from 'discord.js';
import { DiscordUser } from '@/entity';

@EntityRepository(DiscordUser)
export class DiscordUserRepository extends Repository<DiscordUser> {

  public async updateOrCreate(user: User): Promise<DiscordUser> {
    let discordUser: DiscordUser;

    try {
      discordUser = await this.findOneOrFail({ discordId: user.id });
      discordUser.lastActive = new Date();
    } catch (e) {
      discordUser = new DiscordUser(user);
    }

    await this.manager.save(discordUser);

    return discordUser;
  }
}
