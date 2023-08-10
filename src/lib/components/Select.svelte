<script lang="ts">
  export let selectedValue: string
  export let options: string[]
  export let disabled: boolean
  export let id: string | undefined = undefined
</script>

<div class="select">
  <select bind:value={selectedValue} disabled={disabled} id={id}>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
  <span class="arrow"></span>
</div>

<style>
  .select {
    --color: var(--txt-1);
    --bg : var(--bg-2);
    position: relative;
  }
  select {
    font-size: 1em;
    background: var(--bg);
    padding: .5em 2.75em .5em .75em;
    color: var(--color);
    appearance: none;
    cursor: pointer;
  }
  select:disabled {
    cursor: auto;
  }
  .arrow {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 2em;
    pointer-events: none;
  }
  .arrow::before,
  .arrow::after {
    --size: .4em;
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .arrow::before {
    border-right: var(--size) solid transparent;
    border-left: var(--size) solid transparent;
    border-bottom: var(--size) solid var(--color);
    top: 35%;
  }
  .arrow::after {
    border-right: var(--size) solid transparent;
    border-left: var(--size) solid transparent;
    border-top: var(--size) solid var(--color);
    top: 65%;
  }
</style>