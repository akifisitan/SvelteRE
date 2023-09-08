<script lang="ts">
  import { onMount } from "svelte";
  import { getToast } from "$lib/toast";
  import toast from "svelte-french-toast";
  import type { PageData } from "./$types";
  import PropertyTable from "$lib/components/PropertyTable.svelte";

  export let data: PageData;

  onMount(() => {
    const toastData = getToast();
    if (toastData) toast.success(toastData.message);
  });
</script>

<div class="flex flex-col">
  <div class="pt-2 pl-4 pb-4">
    <h2 class="text-xl inline-block pr-2 align-middle">My Properties</h2>
    <a href="/dashboard/properties/create" class="btn btn-accent btn-sm"> Create New </a>
  </div>
  <div class="px-2">
    <PropertyTable properties={data.propertyList} path="/dashboard/properties/" />
  </div>
</div>
