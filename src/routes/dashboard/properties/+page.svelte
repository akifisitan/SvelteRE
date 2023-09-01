<script>
  import UserPropertyTable from "./UserPropertyTable.svelte";

  export let data;
</script>

<div class="flex flex-col">
  <div class="p-2">
    <h2 class="text-xl inline-block mr-2 align-middle">Properties</h2>
    <a href="/dashboard/properties/create" class="btn btn-accent btn-sm"> Create New </a>
  </div>
  <div>
    <UserPropertyTable properties={data.propertyList} />
  </div>
</div>
