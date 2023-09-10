<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import * as api from "$lib/api";
  import toast from "svelte-french-toast";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let loading: boolean;
  export let modal: HTMLDialogElement;
  export let selectedId: number;

  async function handleDelete() {
    loading = true;
    const response = await api.del(fetch, `${data.path}?id=${selectedId}`, data.user?.token);
    if (response.status === 204) {
      toast.success("Entity deleted successfully");
      invalidateAll();
    } else {
      toast.error("An error occurred while deleting the entity");
    }
    loading = false;
    modal.close();
  }
</script>

<dialog bind:this={modal} class="modal text-left">
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
