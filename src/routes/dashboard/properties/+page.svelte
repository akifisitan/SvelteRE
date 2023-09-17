<script lang="ts">
  import { onMount } from "svelte";
  import { handleStoredToast } from "$lib/toast-utilities";
  import type { PageData } from "./$types";
  import PropertyTable from "$lib/components/PropertyTable.svelte";

  export let data: PageData;

  onMount(() => {
    handleStoredToast();
  });
</script>

<div class="flex flex-col">
  <div class="flex items-center py-2 px-4">
    <h2 class="inline-flex text-xl pr-2 align-middle font-semibold">My Properties</h2>
    <a href="/dashboard/properties/create" class="btn btn-accent btn-sm ml-auto"> Create New </a>
  </div>
  <div class="p-2">
    <PropertyTable properties={data.propertyList} path="/dashboard/properties/" />
  </div>
</div>
