<script lang="ts">
  import "../app.css";
  import { navigating } from "$app/stores";
  import Nav from "./Nav.svelte";
  import PreloadingIndicator from "./PreloadingIndicator.svelte";
  import { Toaster } from "svelte-french-toast";
</script>

{#if $navigating}
  <PreloadingIndicator />
{/if}

<svelte:head>
  <title>SvelteRE</title>
</svelte:head>

<Nav />

<Toaster />

<main>
  <slot />
</main>
