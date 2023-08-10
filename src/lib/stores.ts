import { writable } from 'svelte/store'
import { type GameSettings, GAME_TIMER, Difficulty, Theme, type GameState } from './gameSettings'

export const gameSettings = writable<GameSettings>({
  timer: GAME_TIMER,
  theme: Theme.SPORTS,
  difficulty: Difficulty.INTERMEDIATE,
})

export const gameState = writable<GameState>('start')

export const gameScore = writable<{
  selected: number[],
  matched: Set<string>,
  time: number,
}>({
  selected: [],
  matched: new Set(),
  time: GAME_TIMER,
})
