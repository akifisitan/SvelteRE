<script>
  import Filters from "./Filters.svelte";
  import PropertyTable from "./PropertyTable.svelte";

  export let data;
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
