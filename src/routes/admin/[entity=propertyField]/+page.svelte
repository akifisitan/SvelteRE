<script lang="ts">
  import EntityCard from "./EntityCard.svelte";
  import CreateEntityModal from "./CreateEntityModal.svelte";
  import DeleteEntityModal from "./DeleteEntityModal.svelte";
  import UpdateEntityModal from "./UpdateEntityModal.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  let loading = false;
  let deleteModal: HTMLDialogElement;
  let updateModal: HTMLDialogElement;
  let createModal: HTMLDialogElement;
  let selectedId: number;
  let value: string = "";
</script>

<div class="flex flex-col pl-4">
  <h2 class="card-title">
    {data.entityName}
    <button class="btn btn-square btn-accent btn-sm" on:click={() => createModal.showModal()}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-badge-plus"
        ><path
          d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        /><line x1="12" x2="12" y1="8" y2="16" /><line x1="8" x2="16" y1="12" y2="12" /></svg
      ></button
    >
  </h2>
  {#each data.entities as entity}
    <EntityCard {entity} {deleteModal} {updateModal} bind:value bind:selectedId />
  {/each}
</div>

<CreateEntityModal bind:data bind:loading bind:value bind:modal={createModal} />
<DeleteEntityModal bind:data bind:loading bind:selectedId bind:modal={deleteModal} />
<UpdateEntityModal bind:data bind:loading bind:value bind:selectedId bind:modal={updateModal} />
