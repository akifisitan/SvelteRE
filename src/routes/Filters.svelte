<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let queryString;
  export let filterModal: HTMLDialogElement | null = null;
  export let mobileLayout = false;
  let minPrice = 0;
  let maxPrice = 9999999;
  let typeId = 0;
  let currencyId = 0;
  let statusId = 0;

  function clearFilters() {
    minPrice = 0;
    maxPrice = 9999999;
    typeId = 0;
    currencyId = 0;
    statusId = 0;
    queryString = "";
    goto("/", { replaceState: true });
    filterModal?.close();
  }

  function filter() {
    const arr = [];
    if (minPrice !== null && minPrice > 0 && minPrice < 9999999 && minPrice <= maxPrice)
      arr.push(`minPrice=${minPrice}`);
    if (maxPrice !== null && maxPrice > 0 && maxPrice < 9999999 && maxPrice >= minPrice)
      arr.push(`maxPrice=${maxPrice}`);
    if (typeId !== null && typeId > 0) arr.push(`typeId=${typeId}`);
    if (currencyId !== null && currencyId > 0) arr.push(`currencyId=${currencyId}`);
    if (statusId !== null && statusId > 0) arr.push(`statusId=${statusId}`);
    if (arr.length === 0) {
      queryString = "";
      goto("/", { replaceState: true });
    } else {
      queryString = `&${arr.join("&")}`;
      goto(`/?${arr.join("&")}`, { replaceState: true });
    }
    filterModal?.close();
  }
</script>

<div class="flex flex-col menu bg-base-200 rounded-box">
  <h2 class="text-center text-lg">Filters</h2>
  <ul class="mx-auto">
    <li>
      <div>
        <label for={mobileLayout ? "m-minPrice" : "minPrice"} class="label">Min</label>
        <input
          type="number"
          min={0}
          max={9999999}
          id={mobileLayout ? "m-minPrice" : "minPrice"}
          bind:value={minPrice}
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
    </li>
    <li>
      <div>
        <label for={mobileLayout ? "m-maxPrice" : "maxPrice"} class="label">Max</label>
        <input
          id={mobileLayout ? "m-maxPrice" : "maxPrice"}
          type="number"
          min={0}
          max={9999999}
          bind:value={maxPrice}
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
    </li>
    <li>
      <div>
        <label for={mobileLayout ? "m-currencyId" : "currencyId"} class="label">Currency</label>
        <select
          class="select select-bordered select-sm w-full max-w-xs"
          bind:value={currencyId}
          id={mobileLayout ? "m-currencyId" : "currencyId"}
        >
          <option selected value={0}>Any</option>
          {#each data.currencies as currency}
            <option value={currency.id}>
              {currency.value}
            </option>
          {/each}
        </select>
      </div>
    </li>
    <li>
      <div>
        <label for={mobileLayout ? "m-typeId" : "typeId"} class="label">Type</label>
        <select
          class="select select-bordered select-sm w-full max-w-xs"
          bind:value={typeId}
          id={mobileLayout ? "m-typeId" : "typeId"}
        >
          <option selected value={0}>Any</option>
          {#each data.types as type}
            <option value={type.id}>
              {type.value}
            </option>
          {/each}
        </select>
      </div>
    </li>
    <li>
      <div>
        <label for={mobileLayout ? "m-statusId" : "statusId"} class="label">Status</label>
        <select
          class="select select-bordered select-sm w-full max-w-xs"
          bind:value={statusId}
          id={mobileLayout ? "m-statusId" : "statusId"}
        >
          <option selected value={0}>Any</option>
          {#each data.statuses as status}
            <option value={status.id}>
              {status.value}
            </option>
          {/each}
        </select>
      </div>
    </li>
    <li>
      <div class="flex">
        <button class="btn btn-neutral min-w-full mx-auto" on:click={clearFilters}>
          Clear Filters
        </button>
      </div>
      <div class="flex">
        <button class="btn btn-neutral min-w-full mx-auto" on:click={filter}>
          Apply Filters
        </button>
      </div>
    </li>
  </ul>
</div>
