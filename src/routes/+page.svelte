<script lang="ts">
  import Filters from "./Filters.svelte";
  import PropertyTable from "./PropertyTable.svelte";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import toast from "svelte-french-toast";
  import { onMount } from "svelte";

  export let data: PageData;

  onMount(() => {
    if ($page.url.searchParams?.get("login") === "success" && data.user) {
      toast.success(`Logged in as ${data.user.username}`);
    }
  });
</script>

<div class="flex flex-row">
  <div class="filter-menu">
    <Filters {data} />
  </div>
  <div class="table-container">
    {#if data.maxPage > 0}
      <PropertyTable properties={data.propertyList} />
    {:else}
      <div class="w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mx-auto w-32 h-24 lucide lucide-x-octagon"
          ><polygon
            points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
          /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg
        >
        <p class="text-center">No Properties Found</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .filter-menu {
    width: 13rem;
    min-width: 13rem;
  }

  .table-container {
    padding: 1rem;
    width: 100%;
  }
</style>
