<script lang="ts">
  import type { PropertyField } from "$lib/types";

  export let entity: PropertyField;
  export let deleteModal: HTMLDialogElement;
  export let updateModal: HTMLDialogElement;
  export let selectedId: number;
  export let value: string;
</script>

<div class="card card-compact w-96 bg-base-100 shadow-xl mb-2">
  <div class="card-body">
    <div class="card-actions justify-end">
      <button
        on:click={() => {
          selectedId = entity.id;
          value = entity.value;
          updateModal.showModal();
        }}
        class="btn btn-square btn-info btn-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6 lucide lucide-pencil"
          ><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg
        >
      </button>
      <button
        class="btn btn-square btn-error btn-sm"
        on:click={() => {
          selectedId = entity.id;
          deleteModal.showModal();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6 lucide lucide-trash-2"
          ><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
            d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
          /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg
        >
      </button>
    </div>
    <h2 class="card-title">ID: {entity.id}</h2>
    <p class="text-base">{entity.value}</p>
  </div>
</div>
