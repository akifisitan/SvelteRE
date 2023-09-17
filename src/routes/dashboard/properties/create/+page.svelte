<script lang="ts">
  import { centerLat, centerLong } from "$lib/constants";
  import * as api from "$lib/api";
  import { goto } from "$app/navigation";
  import toast from "svelte-french-toast";
  import type { PageData } from "./$types";
  import { prepareToast } from "$lib/toast-utilities";
  import PickLocationModal from "$lib/components/PickLocationModal.svelte";
  import SelectImageModal from "$lib/components/SelectImageModal.svelte";

  export let data: PageData;
  let loading = false;
  let price: number;
  let typeId: number;
  let statusId: number;
  let currencyId: number;
  let endDate: string;
  let images: FileList | null = null;
  let latitude = centerLat;
  let longitude = centerLong;
  let imageModal: HTMLDialogElement;
  let locationModal: HTMLDialogElement;

  function allFilled() {
    if (price && typeId && statusId && currencyId && endDate) return true;
    return false;
  }

  async function createProperty() {
    if (loading) return;
    loading = true;
    if (!allFilled()) {
      toast.error("Please fill all fields");
      loading = false;
      return;
    }
    if (latitude === centerLat && longitude === centerLong) {
      toast.error("Please choose a location");
      loading = false;
      return;
    }
    if (images === null) {
      toast.error("Please choose at least one image");
      loading = false;
      return;
    }
    const form = new FormData();
    form.append("EndDate", endDate);
    form.append("PropertyTypeId", String(typeId));
    form.append("PropertyStatusId", String(statusId));
    form.append("CurrencyId", String(currencyId));
    form.append("Price", String(price));
    form.append("Latitude", latitude.toFixed(2));
    form.append("Longitude", longitude.toFixed(2));
    for (const image of images) {
      form.append("Images", image);
    }
    const response = await api.post(fetch, "Property", data.user?.token, null, form);
    if (response.status === 200) {
      prepareToast({ message: "Property created successfully", type: "success" });
      goto("/dashboard", { replaceState: true });
    } else if (response.status === 400) {
      toast.error(response.data.message);
      loading = false;
    } else {
      toast.error("Something went wrong, please try again later.");
      console.log("Something went wrong, status code: ", response.status);
      loading = false;
    }
  }
</script>

<section class="flex flex-row">
  <div class="basis-full">
    <form
      method="POST"
      on:submit|preventDefault={createProperty}
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
          <option selected disabled>Select a property type</option>
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
          <option selected disabled>Select a property status</option>
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
          <option selected disabled>Select a currency</option>
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
          placeholder="Enter price"
        />
      </div>
      <div>
        <label for="endDate" class="label">Listing Expiry Date</label>
        <input
          bind:value={endDate}
          type="date"
          id="endDate"
          name="EndDate"
          class="input input-bordered input-sm"
        />
      </div>
      <div>
        <label for="choose-location" class="label">Property Location</label>
        <button
          on:click|preventDefault={() => locationModal.showModal()}
          class="btn btn-sm btn-info">Choose Location</button
        >
        {#if latitude === centerLat && longitude === centerLong}
          <p class="inline-flex text-error font-semibold pl-2">Location not chosen</p>
        {:else}
          <p class="inline-flex text-success font-semibold pl-2">Location chosen</p>
        {/if}
      </div>
      <div class="pb-4">
        <label for="add-images" class="label">Property Images</label>
        <button on:click|preventDefault={() => imageModal.showModal()} class="btn btn-sm btn-info"
          >Select Images</button
        >
        {#if images && images.length > 1}
          <p class="inline-flex text-success font-semibold pl-4">
            {images.length} images selected
          </p>
        {:else if images && images.length === 1}
          <p class="inline-flex text-info font-semibold pl-4">1 image selected</p>
        {:else}
          <p class="inline-flex text-error font-semibold pl-4">No images selected</p>
        {/if}
      </div>
      <button type="submit" disabled={loading} class="btn btn-accent p-2">
        {loading ? "Creating property..." : "Create Property"}
      </button>
    </form>
  </div>
  <PickLocationModal bind:modal={locationModal} bind:latitude bind:longitude />
  <SelectImageModal bind:modal={imageModal} bind:images />
</section>
