<script>
  import { enhance } from "$app/forms";
  import { defaultLatitude, defaultLongitude } from "$lib/constants";

  export let data;
  export let form;
  let previewImages;
  let loading = false;

  const createProperty = ({ formData }) => {
    loading = true;
    console.log(formData);

    return async ({ update }) => {
      loading = false;
      await update();
    };
  };
</script>

<section class="flex flex-row">
  <div class="basis-1/2">
    <form
      method="POST"
      on:submit|preventDefault
      enctype="multipart/form-data"
      use:enhance={createProperty}
      class="form-control w-full max-w-xs mx-auto pb-8"
    >
      <div>
        <label for="type" class="label"> Property Type</label>
        <select
          name="PropertyTypeId"
          id="type"
          class="select select-bordered select-sm w-full max-w-xs"
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
          value="250000"
          title="This field is required"
          class="input input-bordered input-sm"
          placeholder="Enter price"
        />
      </div>
      <div>
        <label for="endDate" class="label">Listing Expiry Date</label>
        <input
          value="30/08/2023"
          type="text"
          name="EndDate"
          id="endDate"
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
            previewImages = e.target.files;
          }}
        />
      </div>
      <input name="StartDate" value="25/08/2023" hidden />
      <input name="Latitude" value={defaultLatitude} hidden />
      <input name="Longitude" value={defaultLongitude} hidden />

      <button
        type="submit"
        disabled={loading}
        class="btn btn-accent p-2 mt-2 disabled:cursor-not-allowed"
      >
        {loading ? "Creating property..." : "Create Property"}
      </button>
      {#if form?.error && !loading}
        <div>
          <p class="text-xs text-red-500">{form?.error}</p>
        </div>
      {/if}
    </form>
  </div>
  <div class="basis-1/2">
    <div class="mx-auto mr-4">
      <div>
        <h1>Property Location</h1>
        Map Goes Here
        <!-- <SelectMap
          lat={lat}
          long={long}
          setLat={setLat}
          setLong={setLong}
        /> -->
      </div>
      <div>
        <h1 class="pb-2">Image Preview</h1>
        <div class="flex">
          {#if previewImages && previewImages.length > 0}
            <div class="carousel carousel-center rounded-box mx-auto">
              {#each previewImages as image}
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
