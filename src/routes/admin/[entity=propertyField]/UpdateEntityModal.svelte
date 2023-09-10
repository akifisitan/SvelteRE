<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import * as api from "$lib/api";
  import toast from "svelte-french-toast";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let loading: boolean;
  export let modal: HTMLDialogElement;
  export let value: string;
  export let selectedId: number;

  async function handleUpdate() {
    loading = true;
    const newValue = value.trim();
    if (newValue === "") {
      toast.error("The value cannot be empty");
      loading = false;
      modal.close();
      value = "";
      return;
    }
    const response = await api.put(fetch, `${data.path}`, data.user?.token, {
      id: selectedId,
      value: newValue,
    });
    if (response.status === 204) {
      toast.success("Entity updated successfully");
      invalidateAll();
    } else if (response.status === 409) {
      toast.error("An entity with the same value already exists");
    } else {
      toast.error("An error occurred while updating the entity");
    }
    loading = false;
    modal.close();
    value = "";
  }
</script>

<dialog bind:this={modal} class="modal text-left">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Update Entity</h3>
    <label for="value" class="label">Value</label>
    <input bind:value type="text" class="input" />
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-info" disabled={loading} on:click|preventDefault={handleUpdate}
          >{loading ? "Updating..." : "Confirm"}</button
        >
        <button
          class="btn btn-neutral"
          disabled={loading}
          on:click={() => {
            value = "";
          }}>Close</button
        >
      </form>
    </div>
  </div>
</dialog>
