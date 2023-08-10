<script lang="ts">
  import CardGrid from '$lib/components/CardGrid.svelte'
  import { emojiSets, gridSizes, type GameSettings } from '$lib/gameSettings'
  import { gameScore, gameSettings, gameState } from '$lib/stores'
  import GameScore from './GameScore.svelte';

  let grid: string[] = []
  $: maxMatches = grid.length / 2
  let timerId: number | null = null

  function startGameTimer() {
    function countdown() {
      $gameState !== 'paused' && ($gameScore.time -= 1)
    }
    timerId = setInterval(countdown, 1000)
  }

  function shuffle<Items>(items: Items[]) {
    return items.sort(() => Math.random() - 0.5)
  }

  function createGrid(settings: GameSettings) {
    let cards = new Set<string>()
    const maxSize = gridSizes[settings.difficulty] / 2
    const emojiSet = emojiSets[settings.theme]

    while (cards.size < maxSize) {
      const randomIndex = Math.floor(Math.random() * emojiSet.length)
      cards.add(emojiSet[randomIndex])
    }

    return shuffle([...cards, ...cards])
  }

  function matchCards() {
    const [first, second] = $gameScore.selected
    
    if (grid[first] === grid[second]) {
      $gameScore.matched.add(grid[first])
    }

    setTimeout(() => $gameScore.selected = [], 300)
  }

  function resetGame(settings: GameSettings) {
    timerId && clearInterval(timerId)
    grid = createGrid(settings)
    $gameScore.selected = []
    $gameScore.matched = new Set()
    $gameScore.time = settings.timer
    timerId = null
  }

  function gameWon() {
    timerId && clearInterval(timerId)
    $gameState = 'won'
  }

  function gameLost() {
    timerId && clearInterval(timerId)
    $gameState = 'lost'
  }

  function pauseGame(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      switch($gameState) {
        case 'playing':
          $gameState = 'paused'
          break
        case 'paused':
          $gameState = 'playing'
          break
      }
    }
  }

  function selectCard(event: CustomEvent<{index: number}>) {
    const { index } = event.detail
    $gameScore.selected = [...$gameScore.selected, index]
  }

  function startNewGame() {
    resetGame($gameSettings)
    $gameState = 'playing'
  }

  $: if ($gameState === 'playing') {
    !timerId && startGameTimer()
  }
  $: $gameScore.selected.length === 2 && matchCards()
  $: $gameScore.time === 0 && gameLost()
  $: maxMatches === $gameScore.matched.size && $gameScore.matched.size > 0 && gameWon()

  $: console.log({ $gameState, $gameScore, $gameSettings })
</script>

<svelte:window on:keydown={pauseGame}/>

{#if $gameState === 'start'}
  <h1>Matching Game</h1>
  <button on:click={startNewGame}>Play</button>
{/if}

{#if $gameState === 'paused'}
  <h1>Game Paused</h1>
{/if}

{#if $gameState === 'playing'}
  <GameScore />

  <CardGrid cards={grid} on:selectCard={selectCard} />
{/if}

{#if $gameState === 'lost'}
  <h1>You lost...</h1>
  <button on:click={startNewGame}>Play again</button>
{/if}

{#if $gameState === 'won'}
  <h1>You won!</h1>
  <button on:click={startNewGame}>Play again</button>
{/if}
