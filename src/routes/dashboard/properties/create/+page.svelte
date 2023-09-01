<script>
  import { centerLat, centerLong } from "$lib/constants";
  import InteractiveMap from "$lib/components/InteractiveMap.svelte";
  import * as api from "$lib/api";
  import { goto } from "$app/navigation";

  export let data;

  let loading = false;
  let error;
  let price;
  let typeId;
  let statusId;
  let currencyId;
  let endDate;
  let images;
  let latitude = centerLat;
  let longitude = centerLong;

  function allFilled() {
    if (price && typeId && statusId && currencyId && endDate && images) return true;
    return false;
  }

  async function createProperty() {
    if (loading) return;
    loading = true;
    error = null;
    if (!allFilled()) {
      error = "Please fill all fields";
      loading = false;
      return;
    }
    const form = new FormData();
    form.append("EndDate", endDate);
    form.append("PropertyTypeId", typeId);
    form.append("PropertyStatusId", statusId);
    form.append("CurrencyId", currencyId);
    form.append("Price", price);
    form.append("Latitude", latitude.toFixed(2));
    form.append("Longitude", longitude.toFixed(2));
    for (const image of images) {
      form.append("Photos", image);
    }
    const response = await api.post(fetch, "Property", data.user.token, null, form);
    switch (response.status) {
      case 200:
        goto("/dashboard?createdNew=true", { replaceState: true });
        break;
      case 400:
        error = response.data.message;
        break;
      case 401:
        console.log("unauthorized");
        goto("/logout", { replaceState: true });
        break;
      case 403:
        goto("/logout", { replaceState: true });
        break;
      default:
        console.log("Something went wrong, status code: ", response.status);
        error = "Something went wrong, please try again later.";
        break;
    }
    loading = false;
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
          required
          bind:value={price}
          title="This field is required"
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
        <label for="photos" class="label">Property Images</label>
        <input
          type="file"
          name="Photos"
          id="photos"
          multiple={true}
          required
          accept=".jpg, .jpeg, .png"
          class="file-input file-input-bordered file-input-sm w-full max-w-xs"
          on:change={(e) => {
            images = e.target.files;
          }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        class="btn btn-accent p-2 mt-2 disabled:cursor-not-allowed"
      >
        {loading ? "Creating property..." : "Create Property"}
      </button>
      {#if error}
        <div>
          <p class="text-xs text-red-500">{error}</p>
        </div>
      {/if}
    </form>
  </div>
  <div class="basis-1/2">
    <div class="mx-auto mr-4">
      <div>
        <h1>Select Property Location</h1>
        <InteractiveMap bind:latitude bind:longitude />
      </div>
      <div>
        <h1 class="pb-2">Image Preview</h1>
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
