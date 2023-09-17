<script lang="ts">
  import Pagination from "./Pagination.svelte";
  import Filters from "./Filters.svelte";
  import PropertyTable from "$lib/components/PropertyTable.svelte";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { handleStoredToast } from "$lib/toast-utilities";

  export let data: PageData;
  let queryString = "";
  let filterModal: HTMLDialogElement;

  onMount(() => {
    handleStoredToast();
  });
</script>

<section>
  <div class="filter-modal-btn">
    <div class="pt-2">
      <button on:click={() => filterModal.showModal()} class="btn btn-md">Filters</button>
      <dialog bind:this={filterModal} class="modal text-left">
        <div class="modal-box">
          <Filters {data} bind:queryString {filterModal} mobileLayout={true} />
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
    <Pagination {data} bind:queryString />
  </div>
  <div class="filter-side-menu">
    <Filters {data} bind:queryString />
    <Pagination {data} bind:queryString />
  </div>
  <div class="table-container">
    {#if data.maxPage > 0}
      <PropertyTable properties={data.propertyList} path="/property/" />
    {:else}
      <div class="w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mx-auto w-32 h-24 lucide lucide-x-octagon"
          ><polygon
            points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
          /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg
        >
        <p class="text-center">No Properties Found</p>
      </div>
    {/if}
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: row;
  }

  .filter-modal-btn {
    display: none;
  }

  .filter-side-menu {
    width: 14rem;
    min-width: 14rem;
    padding-top: 1rem;
    padding-left: 1rem;
  }

  .table-container {
    padding: 1rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    section {
      flex-direction: column;
    }
    .filter-side-menu {
      display: none;
    }
    .filter-modal-btn {
      display: flex;
      margin: auto;
    }
  }
</style>
