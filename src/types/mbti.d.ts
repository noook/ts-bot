import { Snowflake, MessageReaction, User } from "discord.js";

export interface MbtiTest {
  id: number;
  discord_id: Snowflake;
  step: number;
  completed: Boolean;
}

export type QuestionPosition = 'left' | 'right';
export type Dichotomy = 'I' | 'E' | 'S' | 'N' | 'T' | 'F' | 'P' | 'J';
export type DichotomyCouple = [Dichotomy, Dichotomy];
export interface UserMbtiResult {
  [key: string]: string
}

export interface MbtiQuestion {
  step: number;
  position: QuestionPosition;
  label: string;
  value: string;
}

export interface MbtiAnswer {
  id: number;
  test: number;
  question: number;
  value: string;
}

export type EmbedColorType = "#ffff00" | "#fab1a0" | "#2ecc71" | "#c56cf0"

export type HandlerByColor = {
  [key in EmbedColorType]: (reaction: MessageReaction, user: User) => any
}
