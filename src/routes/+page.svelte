<script>
  import Filters from "./Filters.svelte";
  import PropertyTable from "./PropertyTable.svelte";
  import { page } from "$app/stores";
  import toast from "svelte-french-toast";
  import { onMount } from "svelte";

  export let data;

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
      <p class="m-4 p-4 justify-center">No data found matching filters</p>
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
