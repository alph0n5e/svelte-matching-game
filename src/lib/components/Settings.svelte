<script lang="ts">
  import { gameSettings, gameState } from '../stores'
  import { Difficulty, Theme } from '../gameSettings'
  import Select from './Select.svelte'

  $: settingDisabled = $gameState === 'paused' || $gameState === 'playing'
</script>

<footer>
  <label for="theme">
    <p>Theme</p>
    <Select 
      bind:selectedValue={$gameSettings.theme}
      options={Object.values(Theme)}
      disabled={settingDisabled}
      id="theme"
    />
  </label>

  <label for="difficulty">
    <p>Difficulty</p>
    <Select 
      bind:selectedValue={$gameSettings.difficulty}
      options={Object.values(Difficulty)}
      disabled={settingDisabled}
      id="difficulty"
    />
  </label>

</footer>

<style>
  footer {
    margin-top: .75rem;
    padding: 1.2rem;
    display: flex;
    gap: 1em;
    justify-content: space-around;
    align-items: baseline;
    background-color: var(--bg-2);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  label {
    display: flex;
    align-items: center;
    gap: 1em;
    font-size: 1em;
  }
</style>