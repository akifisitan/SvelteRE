<script>
  import InteractiveMap from "$lib/components/InteractiveMap.svelte";
  import { goto, invalidate, invalidateAll } from "$app/navigation";
  import * as api from "$lib/api";

  export let data;

  let loading = false;
  let error;
  let typeId;
  let statusId;
  let currencyId;
  let images;
  let endDate = data.property.endDate;
  let price = data.property.price;
  let latitude = data.property.latitude;
  let longitude = data.property.longitude;
  $: property = data.property;

  $: {
    console.log("Property:");
    console.log(data.property);
  }

  async function editProperty() {
    const body = { id: property.id, price, endDate };
    if (typeId !== -1) {
      body.typeId = typeId;
    }
    if (statusId !== -1) {
      body.statusId = statusId;
    }
    if (currencyId !== -1) {
      body.currencyId = currencyId;
    }
    console.log(body);
    const response = await api.put(fetch, "Property", data.user.token, body);
    if (response.status === 204) {
      invalidateAll();
    } else {
      error = "Error editing property";
    }
  }

  async function deleteImage(imageId) {
    loading = true;
    const response = await api.del(fetch, `PropertyImage?id=${imageId}`, data.user.token);
    if (response.status === 204) {
      console.log("Deleted image");
      invalidateAll();
    } else {
      error = "Error deleting image";
    }
    loading = false;
  }

  async function editPropertyLocation() {
    loading = true;
    if (latitude === property.latitude && longitude === property.longitude) {
      console.log("No change in location");
      loading = false;
      return;
    }
    const body = {
      id: property.id,
      latitude: latitude.toFixed(2),
      longitude: longitude.toFixed(2),
    };
    console.log(body);
    const response = await api.put(fetch, "Property", data.user.token, body);
    if (response.status === 204) {
      console.log("Edited property location");
      invalidateAll();
    } else {
      error = "Error editing property location";
    }
    loading = false;
  }

  async function addImages() {
    loading = true;
    if (!images || images.length === 0) {
      error = "Please select images to upload";
      console.log("Please select images to upload");
      loading = false;
      return;
    }
    const form = new FormData();
    form.append("PropertyId", property.id);
    for (const image of images) {
      form.append("Images", image);
    }
    console.log(form);
    const response = await api.post(fetch, "PropertyImage", data.user.token, null, form);
    if (response.status === 200) {
      images = null;
      invalidateAll();
    } else {
      error = "Error adding images";
    }
    loading = false;
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
            <option selected disabled value={-1}>Previous: {property.type}</option>
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
            <option selected disabled value={-1}>Previous: {property.status}</option>
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
            <option selected disabled value={-1}>Previous: {property.currency}</option>
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
        <button type="submit" disabled={loading} class="btn btn-accent p-2 mt-2">
          {loading ? "Saving changes..." : "Save Changes"}
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
          <h1>Property Location</h1>
          <InteractiveMap bind:latitude bind:longitude />
          <button on:click={editPropertyLocation} disabled={loading} class="btn btn-accent"
            >{loading ? "Loading..." : "Edit Location"}</button
          >
        </div>
      </div>
    </div>
  </div>
  <div>
    <div>
      {#each data.property.images as image}
        <div>
          <img src={image.value} alt="{property.type} {property.status}" />
          <button on:click={() => deleteImage(image.id)} class="btn btn-error">Delete</button>
        </div>
      {/each}
    </div>
    <div>
      <form method="POST" on:submit|preventDefault={addImages}>
        <label for="images" class="label">Add new images</label>
        <input
          type="file"
          name="Images"
          required
          id="images"
          multiple={true}
          accept=".jpg, .jpeg, .png"
          class="file-input file-input-bordered file-input-sm w-full max-w-xs"
          on:change={(e) => {
            images = e.target.files;
          }}
        />
        <button type="submit" disabled={loading} class="btn btn-accent p-2 mt-2">
          {loading ? "Adding images..." : "Add images"}
        </button>
      </form>
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
