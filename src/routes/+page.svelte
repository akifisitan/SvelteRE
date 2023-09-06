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
  <div class="basis-1/5">
    <Filters {data} />
  </div>
  <div class="basis-4/5">
    {#if data.maxPage > 0}
      <PropertyTable properties={data.propertyList} />
    {:else}
      <p class="m-4 p-4 justify-center">No data found matching filters</p>
    {/if}
  </div>
</div>
