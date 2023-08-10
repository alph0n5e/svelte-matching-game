<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { gameScore } from '../stores'

  export let content: string
  export let index: number

  const dispatch = createEventDispatcher<{ selectCard: { index: number } }>()

  $: isSelected = $gameScore.selected.includes(index)
  $: isMatched = $gameScore.matched.has(content)
  $: isSelectedOrMatched = isSelected || isMatched

  function selectCard(index: number) {
    dispatch('selectCard', { index })
  }
</script>

<button
  class="card"
  class:selected={isSelected}
  class:flip={isSelectedOrMatched}
  disabled={isSelectedOrMatched}
  on:click={() => selectCard(index)}
>
  <div
    class="back"
    class:match={isMatched}
  >
    {content}
  </div>
</button>

<style>
  .card {
    aspect-ratio: 1;
    font-size: 4rem;
    background-color: var(--bg-2);
    transition: rotate .3s ease-out;
    transform-style: preserve-3d;
  }

  .card.selected {
    border: 4px solid var(--border);
  }

  .card.flip {
    rotate: y 180deg;
    pointer-events: none;
  }

  .card .back {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    backface-visibility: hidden;
    rotate: y 180deg;
  }

  .card .match {
    transition: opacity 0.3s ease-out;
    opacity: 0.4;
  }
</style>