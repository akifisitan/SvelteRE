<script lang="ts">
  import AdminPropertyTable from "./AdminPropertyTable.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="flex flex-row pl-4">
  {#if data.maxPage > 0}
    <AdminPropertyTable properties={data.propertyList} />
  {:else}
    <p class="m-4 p-4 justify-center">No properties available</p>
  {/if}
</div>
