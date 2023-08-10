<script lang="ts">
  import { gridSizes } from '../gameSettings'
  import { gameScore, gameSettings } from '../stores'

  $: remainingPairs = gridSizes[$gameSettings.difficulty] / 2 - $gameScore.matched.size
</script>

<div class="score">
  <div class="score-item">
    <h3>Matched pairs</h3>
    <ul class="matches">
      {#each $gameScore.matched as card}
        <li>{card}</li>
      {/each}
    </ul>
    
  </div>

  <div class="score-item">
    <h3>Remaining pairs</h3>
    <div class="remaining">{remainingPairs}</div>
  </div>

  <div class="score-item">
    <h3>Time</h3>
    <div
      class="timer"
      class:pulse={ $gameScore.time <= 10 }
    >
      {$gameScore.time}
    </div>
  </div>
</div>

<style>
  .score {
    display: flex;
    margin-block: 1em;
    justify-content: space-between;
    align-items: start;
    padding: 1em;
  }

  .score-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h3 {
    font-size: 1.4em;
    font-weight: 400;
  }

  .remaining {
    font-size: 3em;
  }

  .timer {
    transition: color .3s ease;
    font-size: 3em;
  }

  .timer.pulse {
    color: var(--pulse);
    animation: pulse 1s infinite ease;
  }

  @keyframes pulse {
    to {
      scale: 1.2;
    }
  }

  ul.matches {
    display: flex;
    gap: 1rem;
    font-size: 3rem;
    align-self: flex-start;
  }
  ul.matches li {
    list-style: none;
  }
</style>