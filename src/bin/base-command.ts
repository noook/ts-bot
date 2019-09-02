import { Connection } from 'typeorm';
import { initConnection } from '@/orm';

export interface BaseCommandRequirement {
  alias: string;
}

export default class CommandPool {
  private commands: {
    [key: string]: BaseCommand;
  };

  public register(commands: BaseCommand[]) {
    this.commands = commands.reduce((acc, value: BaseCommand) => {
      acc[value.alias] = value;
      return acc;
    }, {});
  }

  public run(command: string, ...args: any[]) {
    this.commands[command].run(args);
  }
}

export abstract class BaseCommand {
  public alias: string;
  protected conn: Connection;

  async setup() {
    this.conn = await initConnection();
  }

  public abstract async run(...args: any[]): Promise<void>;
}
