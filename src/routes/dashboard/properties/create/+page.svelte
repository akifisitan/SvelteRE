<script lang="ts">
  import { centerLat, centerLong } from "$lib/constants";
  import InteractiveMap from "$lib/components/InteractiveMap.svelte";
  import * as api from "$lib/api";
  import { goto } from "$app/navigation";
  import toast from "svelte-french-toast";
  import type { PageData } from "./$types";
  import { setToast } from "$lib/toast";

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

  function allFilled() {
    if (price && typeId && statusId && currencyId && endDate) return true;
    return false;
  }

  function setImages(event: Event) {
    const target = event.target as HTMLInputElement;
    images = target.files;
  }

  async function createProperty() {
    if (loading) return;
    loading = true;
    if (!allFilled()) {
      toast.error("Please fill all fields");
      loading = false;
      return;
    }
    if (images === null) {
      toast.error("Please select at least one image");
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
      setToast({ message: "Property created successfully", type: "success" });
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
  <div class="basis-1/2">
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
        <label for="images" class="label">Property Images</label>
        <input
          type="file"
          name="Images"
          id="images"
          multiple={true}
          accept=".jpg, .jpeg, .png"
          class="file-input file-input-bordered file-input-sm w-full max-w-xs"
          on:change={setImages}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        class="btn btn-accent p-2 mt-2 disabled:cursor-not-allowed"
      >
        {loading ? "Creating property..." : "Create Property"}
      </button>
    </form>
  </div>
  <div class="basis-1/2">
    <div class="mx-auto mr-4">
      <div>
        <h1 class="text-lg pb-2">Property Location</h1>
        <InteractiveMap bind:latitude bind:longitude />
      </div>
      <div>
        <h1 class="text-lg py-2">Image Preview</h1>
        <div class="flex">
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
  </div>
</section>
