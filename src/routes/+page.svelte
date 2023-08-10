<script lang="ts">
  import '../app.css'
  import Game from '../lib/components/Game.svelte'
  import Header from '../lib/components/Header.svelte'
  import Settings from '../lib/components/Settings.svelte'
</script>

<svelte:head>
  <title>Matching Game</title>
</svelte:head>

<main>
  <Game/>
</main>
<Settings/>

<style>
  main {
    display: flex;
    flex-direction: column;
    place-content: center;
  }
</style>