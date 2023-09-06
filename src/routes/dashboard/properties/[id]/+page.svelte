<script lang="ts">
  import { goto } from "$app/navigation";
  import StaticMap from "$lib/components/StaticMap.svelte";
  import { formatDate } from "$lib/date";
  import { setToast } from "$lib/toast";
  import toast, { Toaster } from "svelte-french-toast";
  import * as api from "$lib/api";

  export let data;
  const property = data?.property;
  let deleting = false;
  let modal: HTMLDialogElement;

  async function handleDelete() {
    deleting = true;
    const { status } = await api.del(fetch, `Property?id=${property.id}`, data.user?.token);
    if (status === 204) {
      setToast({ message: "Property deleted successfully", type: "success" });
      goto("/dashboard/properties");
    } else {
      toast.error("An error occurred while deleting the property.");
      modal.close();
      deleting = false;
    }
  }
</script>

<div class="px-8">
  <div class="text-right">
    <a href="./{property.id}/edit" class="btn btn-neutral"
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
        class="lucide lucide-pencil"
        ><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg
      ></a
    >

    <button
      class="btn btn-error"
      on:click={() => {
        modal.showModal();
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
        class="lucide lucide-trash-2"
        ><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
          d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
        /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg
      ></button
    >
    <dialog bind:this={modal} class="modal text-left">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Are you sure you want to delete this property?</h3>
        <p class="py-4">This action cannot be undone!</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-error" disabled={deleting} on:click|preventDefault={handleDelete}
              >{deleting ? "Deleting" : "Delete"}</button
            >
            <button class="btn btn-info" disabled={deleting}>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
  <div class="text-xl">
    <h2 class="text-2xl font-bold">Listing Date</h2>
    <p>
      {formatDate(property.startDate, "dd/MM/yyyy")} - {formatDate(property.endDate, "dd/MM/yyyy")}
    </p>
    <p>
      {property.type}
    </p>
    <p>
      {property.status}
    </p>
    <p>
      {property.price}
      {property.currency}
    </p>
  </div>
</div>

<div class="flex flex-col">
  <div class="flex mx-auto py-4"><p class="text-lg">Image Gallery</p></div>
  <div class="flex mx-auto content-center justify-center">
    <div class="carousel w-1/2 border-8 rounded-md border-gray-800">
      {#each property.images as image, index (image.id)}
        <div id="slide{index}" class="carousel-item relative w-full">
          <img
            src={image.value}
            alt="{property.type}{property.status}"
            class="w-full aspect-video"
          />
          <div
            class="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2"
          >
            <a href="#slide{index - 1}" class="btn btn-circle {index === 0 ? 'invisible' : null}"
              >❮</a
            >
            {#if index !== property.images.length - 1}
              <a href="#slide{index + 1}" class="btn btn-circle">❯</a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="flex flex-col pb-8">
  <div class="flex mx-auto py-4"><p class="text-lg">Map Location</p></div>
  <StaticMap {property} />
</div>
