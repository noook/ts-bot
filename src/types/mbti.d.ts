import { Snowflake, MessageReaction, User } from "discord.js";

export type QuestionPosition = 'left' | 'right';
export type Dichotomy = 'I' | 'E' | 'S' | 'N' | 'T' | 'F' | 'P' | 'J';
export type DichotomyCouple = [Dichotomy, Dichotomy];
export interface UserMbtiResult {
  [key: string]: string;
}

export interface QuestionBase {
  position: QuestionPosition;
  label: {
    [lang: string]: string;
  };
  value: Dichotomy
}

export type IndexedQuestion = QuestionBase & {
  index: number;
}

export type QuestionsToLoad = [QuestionBase, QuestionBase][];

export type EmbedColorType = "#ffff00" | "#fab1a0" | "#2ecc71" | "#c56cf0"

export type HandlerByColor = {
  [key in EmbedColorType]: (reaction: MessageReaction, user: User) => any
}
