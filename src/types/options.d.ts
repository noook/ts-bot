import { Config } from 'types/config';
import { WebSocketOptions, WSEventType, HTTPOptions } from 'discord.js';

export type ClientOptions = {
  apiRequestMethod?: string;
  shardId?: number;
  shardCount?: number;
  messageCacheMaxSize?: number;
  messageCacheLifetime?: number;
  messageSweepInterval?: number;
  fetchAllMembers?: boolean;
  disableEveryone?: boolean;
  sync?: boolean;
  restWsBridgeTimeout?: number;
  restTimeOffset?: number;
  retryLimit?: number;
  disabledEvents?: WSEventType[];
  ws?: WebSocketOptions;
  http?: HTTPOptions;
};

export type CommandoClientOptions = ClientOptions & {
  commandPrefix?: string;
  commandEditableDuration?: number;
  nonCommandEditable?: boolean;
  owner?: string | string[] | Set<string>;
  invite?: string;
} & Config;
