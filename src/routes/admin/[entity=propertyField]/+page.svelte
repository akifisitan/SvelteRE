<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import * as api from "$lib/api";
  import toast from "svelte-french-toast";
  import type { PageData } from "./$types";

  export let data: PageData;
  let loading = false;
  let deleteModal: HTMLDialogElement;
  let editModal: HTMLDialogElement;
  let createModal: HTMLDialogElement;
  let selectedId: number;
  let value: string = "";

  async function handleCreate() {
    loading = true;
    const { status } = await api.post(fetch, `${data.path}`, data.user?.token, {
      value: value,
    });
    if (status === 200) {
      toast.success("Entity created successfully");
      invalidateAll();
    } else {
      toast.error("An error occurred while creating the entity.");
    }
    loading = false;
    createModal.close();
  }

  async function handleDelete() {
    loading = true;
    const { status } = await api.del(fetch, `${data.path}?id=${selectedId}`, data.user?.token);
    if (status === 204) {
      toast.success("Entity deleted successfully");
      invalidateAll();
    } else {
      toast.error("An error occurred while deleting the entity.");
    }
    loading = false;
    deleteModal.close();
  }

  async function handleEdit() {
    loading = true;
    const { status } = await api.put(fetch, `${data.path}`, data.user?.token, {
      id: selectedId,
      value: value,
    });
    value = "";
    if (status === 200) {
      toast.success("Entity edited successfully");
      invalidateAll();
    } else {
      toast.error("An error occurred while editing the entity.");
    }
    loading = false;
    editModal.close();
  }
</script>

<div class="flex flex-col pl-4">
  <h2 class="card-title">
    Create New <button
      class="btn btn-square btn-accent btn-sm"
      on:click={() => {
        createModal.showModal();
      }}
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
    <div class="card card-compact w-96 bg-base-100 shadow-xl mb-2">
      <div class="card-body">
        <div class="card-actions justify-end">
          <button
            on:click={() => {
              selectedId = entity.id;
              editModal.showModal();
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
              ><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path
                d="m15 5 4 4"
              /></svg
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
              /><line x1="10" x2="10" y1="11" y2="17" /><line
                x1="14"
                x2="14"
                y1="11"
                y2="17"
              /></svg
            >
          </button>
        </div>
        <h2 class="card-title">ID: {entity.id}</h2>
        <p class="text-base">{entity.value}</p>
      </div>
    </div>
  {/each}
</div>

<dialog bind:this={deleteModal} class="modal text-left">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Are you sure you want to delete this entity?</h3>
    <p class="py-4">This action cannot be undone!</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-error" disabled={loading} on:click|preventDefault={handleDelete}
          >{loading ? "Deleting..." : "Delete"}</button
        >
        <button class="btn btn-neutral" disabled={loading}>Close</button>
      </form>
    </div>
  </div>
</dialog>

<dialog bind:this={editModal} class="modal text-left">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Edit entity</h3>
    <label for="value" class="label">Value</label>
    <input bind:value type="text" class="input" />
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-info" disabled={loading} on:click|preventDefault={handleEdit}
          >{loading ? "Editing..." : "Confirm"}</button
        >
        <button class="btn btn-neutral" disabled={loading}>Close</button>
      </form>
    </div>
  </div>
</dialog>

<dialog bind:this={createModal} class="modal text-left">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Create entity</h3>
    <label for="value" class="label">Value</label>
    <input bind:value type="text" class="input" />
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-success" disabled={loading} on:click|preventDefault={handleCreate}
          >{loading ? "Creating..." : "Create"}</button
        >
        <button class="btn btn-neutral" disabled={loading}>Close</button>
      </form>
    </div>
  </div>
</dialog>
