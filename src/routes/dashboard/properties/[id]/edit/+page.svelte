<script lang="ts">
  import InteractiveMap from "$lib/components/InteractiveMap.svelte";
  import { goto, invalidate, invalidateAll } from "$app/navigation";
  import * as api from "$lib/api";
  import toast from "svelte-french-toast";
  import type { PageData } from "./$types";
  import type { EditPropertyBody } from "$lib/types";
  import { setToast } from "$lib/toast";

  export let data: PageData;
  let loading = false;
  let typeId: number;
  let statusId: number;
  let currencyId: number;
  let images: FileList | null;
  let selectedImageId: number;
  let deleteImageModal: HTMLDialogElement;
  let endDate = data.property.endDate;
  let price = data.property.price;
  let latitude = data.property.latitude;
  let longitude = data.property.longitude;

  $: pendingChanges =
    typeId !== -1 ||
    statusId !== -1 ||
    currencyId !== -1 ||
    endDate !== data.property.endDate ||
    price !== data.property.price ||
    latitude !== data.property.latitude ||
    longitude !== data.property.longitude;

  async function editProperty() {
    loading = true;
    const body: EditPropertyBody = { id: data.property.id };
    if (price !== data.property.price) {
      body.price = price;
    }
    if (endDate !== data.property.endDate) {
      body.endDate = endDate;
    }
    if (typeId !== -1) {
      body.typeId = typeId;
    }
    if (statusId !== -1) {
      body.statusId = statusId;
    }
    if (currencyId !== -1) {
      body.currencyId = currencyId;
    }
    if (latitude !== data.property.latitude) {
      body.latitude = Number(latitude.toFixed(2));
    }
    if (longitude !== data.property.longitude) {
      body.longitude = Number(longitude.toFixed(2));
    }
    const response = await api.put(fetch, "Property", data.user?.token, body);
    if (response.status === 204) {
      setToast({ message: "Property edited successfully", type: "success" });
      goto(`/dashboard/properties/${data.property.id}`, { replaceState: true });
    } else {
      toast.error("An error occurred while editing the property.");
      loading = false;
    }
  }

  async function deleteImage() {
    loading = true;
    const response = await api.del(fetch, `PropertyImage?id=${selectedImageId}`, data.user?.token);
    if (response.status === 204) {
      toast.success("Image deleted successfully");
      invalidateAll();
    } else if (response.status === 400) {
      toast.error("You cannot delete the last image of a property.");
    } else {
      toast.error("An error occurred while deleting the image.");
    }
    deleteImageModal.close();
    loading = false;
  }

  async function addImages() {
    loading = true;
    if (!images || images.length === 0) {
      toast.error("Please select images to upload");
      loading = false;
      return;
    }
    const form = new FormData();
    form.append("PropertyId", String(data.property.id));
    for (const image of images) {
      form.append("Images", image);
    }
    console.log(form);
    const response = await api.post(fetch, "PropertyImage", data.user?.token, null, form);
    if (response.status === 200) {
      images = null;
      toast.success("Images added successfully");
      invalidateAll();
    } else {
      toast.error("An error occurred while adding the images.");
    }
    loading = false;
  }

  function setImages(event: Event) {
    const target = event.target as HTMLInputElement;
    images = target.files;
  }
</script>

<section>
  <div class="flex flex-row">
    <div class="basis-1/2">
      <form
        method="POST"
        on:submit|preventDefault={editProperty}
        enctype="multipart/form-data"
        class="form-control w-full max-w-xs mx-auto pb-8"
      >
        <div>
          <label for="type" class="label"> Property Type</label>
          <select
            name="PropertyTypeId"
            id="type"
            class="select select-bordered select-sm w-full max-w-xs"
            bind:value={typeId}
          >
            <option selected disabled value={-1}>Previous: {data.property.type}</option>
            {#each data.types as type}
              <option value={type.id}>
                {type.value}
              </option>
            {/each}
          </select>
        </div>
        <div>
          <label for="status" class="label">Property Status</label>
          <select
            name="PropertyStatusId"
            id="status"
            class="select select-bordered select-sm w-full max-w-xs"
            bind:value={statusId}
          >
            <option selected disabled value={-1}>Previous: {data.property.status}</option>
            {#each data.statuses as status}
              <option value={status.id}>
                {status.value}
              </option>
            {/each}
          </select>
        </div>
        <div>
          <label for="currency" class="label">Currency</label>
          <select
            name="CurrencyId"
            id="currency"
            class="select select-bordered select-sm w-full max-w-xs"
            bind:value={currencyId}
          >
            <option selected disabled value={-1}>Previous: {data.property.currency}</option>
            {#each data.currencies as currency}
              <option value={currency.id}>
                {currency.value}
              </option>
            {/each}
          </select>
        </div>
        <div>
          <label for="price" class="label">Price</label>
          <input
            type="number"
            id="price"
            name="Price"
            bind:value={price}
            class="input input-bordered input-sm"
            placeholder="Enter new price"
          />
        </div>
        <div>
          <label for="endDate" class="label">End Date</label>
          <input
            bind:value={endDate}
            type="date"
            id="endDate"
            name="EndDate"
            class="input input-bordered input-sm"
          />
        </div>
        <button type="submit" disabled={!pendingChanges || loading} class="btn btn-accent p-2 mt-2">
          {loading ? "Saving changes..." : "Save Changes"}
        </button>
      </form>
    </div>
    <div class="basis-1/2">
      <div class="mx-auto mr-4">
        <div>
          <h1>Property Location</h1>
          <InteractiveMap bind:latitude bind:longitude />
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="flex flex-col">
      <div class="flex mx-auto py-4"><p class="text-lg">Image Gallery</p></div>
      <div class="flex mx-auto content-center justify-center">
        <div class="carousel w-1/2 border-8 rounded-md border-gray-800">
          {#each data.property.images as image, index (image.id)}
            <div id="slide{index}" class="carousel-item relative w-full">
              <img
                src={image.value}
                alt="{data.property.type}{data.property.status}"
                class="w-full aspect-video"
              />
              <button
                on:click={() => {
                  selectedImageId = image.id;
                  deleteImageModal.showModal();
                }}
                class="btn btn-square btn-error btn-sm absolute top-2 right-2"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-5 w-5 lucide lucide-trash-2"
                  ><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
                    d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                  /><line x1="10" x2="10" y1="11" y2="17" /><line
                    x1="14"
                    x2="14"
                    y1="11"
                    y2="17"
                  /></svg
                ></button
              >

              <div
                class="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2"
              >
                <a
                  href="#slide{index - 1}"
                  class="btn btn-circle {index === 0 ? 'invisible' : null}">❮</a
                >
                {#if index !== data.property.images.length - 1}
                  <a href="#slide{index + 1}" class="btn btn-circle">❯</a>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="pl-4">
      <form method="POST" on:submit|preventDefault={addImages}>
        <label for="images" class="label">Add new images</label>
        <input
          type="file"
          name="Images"
          id="images"
          multiple={true}
          accept=".jpg, .jpeg, .png"
          class="file-input file-input-bordered file-input-sm w-full max-w-xs"
          on:change={setImages}
        />
        <button type="submit" disabled={loading} class="btn btn-accent btn-sm p-2 mt-2">
          {loading ? "Adding images..." : "Add images"}
        </button>
      </form>
      <div class="flex flex-col pb-8">
        <h2 class="pb-4 mx-auto text-lg">Image Preview</h2>
        {#if images && images.length > 0}
          <div class="carousel carousel-center rounded-box mx-auto">
            {#each images as image}
              <div class="carousel-item">
                <img class="block w-96 h-72" src={URL.createObjectURL(image)} alt={image.name} />
              </div>
            {/each}
          </div>
        {:else}
          <div class="mx-auto my-24">No images selected</div>
        {/if}
      </div>
    </div>
  </div>
</section>

<dialog bind:this={deleteImageModal} class="modal text-left">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Are you sure you want to delete this image?</h3>
    <p class="py-4">This action cannot be undone!</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-error" disabled={loading} on:click|preventDefault={deleteImage}
          >{loading ? "loading" : "Delete"}</button
        >
        <button class="btn btn-neutral" disabled={loading}>Close</button>
      </form>
    </div>
  </div>
</dialog>
