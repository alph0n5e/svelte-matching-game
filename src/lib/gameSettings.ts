import { animalsEmoji, countriesEmoji, smileysEmoji, sportsEmoji } from './emoji'

export type GameState = 'start' | 'playing' | 'paused' | 'won' | 'lost'

export const GAME_TIMER = 60

export enum Difficulty {
  EASY = 'Easy 😌',
  INTERMEDIATE = 'Intermediate 🤔',
  HARD = 'Hard 🥵',
}

export const gridSizes: {
  [key in Difficulty]: number
} = {
  [Difficulty.EASY]: 12,
  [Difficulty.INTERMEDIATE]: 20,
  [Difficulty.HARD]: 30,
}

export enum Theme {
  SPORTS = 'Sports ⚽️',
  ANIMALS = 'Animals 🦁',
  SMILEYS = 'Smileys 😊',
  COUNTRIES = 'Countries 🇫🇷',
}

export const emojiSets: {
  [key in Theme]: string[]
} = {
  [Theme.ANIMALS]: animalsEmoji,
  [Theme.COUNTRIES]: countriesEmoji,
  [Theme.SMILEYS]: smileysEmoji,
  [Theme.SPORTS]: sportsEmoji,
}

export type GameSettings = {
  timer: number,
  theme: Theme,
  difficulty: Difficulty
}