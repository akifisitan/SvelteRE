<script>
  import { goto } from "$app/navigation";

  export let data;

  let queryString = "";
  let minPrice = 0;
  let maxPrice = 9999999;
  let typeId = 0;
  let currencyId = 0;
  let statusId = 0;
  $: maxPage = data.maxPage;
  $: currentPage = data.currentPage;

  function clearFilters() {
    minPrice = 0;
    maxPrice = 9999999;
    typeId = 0;
    currencyId = 0;
    statusId = 0;
    queryString = "";
    goto("/", { replaceState: true });
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
  }
</script>

<div class="flex flex-row pt-4 pl-4">
  <ul class="menu bg-base-200 rounded-box mx-auto">
    <h2 class="text-center text-lg">Filters</h2>
    <li>
      <div>
        <label for="minPrice" class="label">Min</label>
        <input
          type="number"
          min={0}
          max={9999999}
          id="minPrice"
          bind:value={minPrice}
          class="input input-bordered input-sm w-full max-w-xs"
        />
      </div>
    </li>
    <li>
      <div>
        <label for="maxPrice" class="label">Max</label>
        <input
          id="maxPrice"
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
        <label for="currencyId" class="label">Currency</label>
        <select
          class="select select-bordered select-sm w-full max-w-xs"
          bind:value={currencyId}
          id="currencyId"
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
        <label for="typeId" class="label">Type</label>
        <select
          class="select select-bordered select-sm w-full max-w-xs"
          bind:value={typeId}
          id="typeId"
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
        <label for="statusId" class="label">Status</label>
        <select
          class="select select-bordered select-sm w-full max-w-xs"
          bind:value={statusId}
          id="statusId"
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
        <button class="btn btn-accent min-w-full mx-auto" on:click={filter}> Apply Filters </button>
      </div>
    </li>
  </ul>
</div>
<div class="flex flex-row mt-2">
  <div class="join w-full justify-center items-center">
    {#if maxPage > 0}
      <a
        class="join-item btn w-1/6"
        href={currentPage === 1 ? null : `/?page=${currentPage - 1}${queryString}`}
      >
        «
      </a>
      <button class="join-item btn w-2/5">
        Page {currentPage} / {maxPage}
      </button>
      <a
        class="join-item btn w-1/6"
        href={currentPage === maxPage ? null : `/?page=${currentPage + 1}${queryString}`}
      >
        »
      </a>
    {:else}
      <button class="join-item btn w-1/6"> « </button>
      <button class="join-item btn w-2/5"> Page 1 / 1 </button>
      <button class="join-item btn w-1/6"> » </button>
    {/if}
  </div>
</div>
