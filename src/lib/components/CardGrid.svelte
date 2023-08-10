<script lang="ts">
  import { gameSettings } from '../stores'
  import Card from './Card.svelte'


  export let cards: string[]
</script>

<div class={`cards ${$gameSettings.difficulty.toLowerCase()}`}>
  {#each cards as card, index}
    <Card content={card} index={index} on:selectCard />
  {/each}
</div>

<style>
  .cards {
    display: grid;
    gap: 0.4rem;
  }
  .cards.easy {
    grid-template-columns: repeat(4, 1fr);
  }
  .cards.intermediate {
    grid-template-columns: repeat(5, 1fr);
  }
  .cards.hard {
    grid-template-columns: repeat(6, 1fr);
  }
</style>