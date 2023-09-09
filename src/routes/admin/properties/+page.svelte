<script lang="ts">
  import PropertyTable from "$lib/components/PropertyTable.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="flex flex-col p-4">
  {#if data.maxPage > 0}
    <PropertyTable properties={data.propertyList} path="/dashboard/properties/" />
  {:else}
    <p class="m-4 p-4 justify-center">No properties available</p>
  {/if}
</div>
