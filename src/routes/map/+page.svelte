<script>
  import "leaflet/dist/leaflet.css";
  import * as api from "$lib/api";
  import PropertyMap from "./PropertyMap.svelte";

  let loading = false;

  async function getMarkers() {
    try {
      const response = await api.get(fetch, "Property/getAllMapData");
      return response.data;
    } catch (e) {
      return null;
    }
  }
</script>

<svelte:head>
  <title>Property Map</title>
</svelte:head>

{#await getMarkers() then data}
  <div class="flex">
    {#if loading}
      <div class="flex">
        <div class="mx-auto">Loading map data</div>
        <span class="loading loading-spinner loading-lg text-accent mx-auto my-36" />
      </div>
    {:else}
      <div class="map-container mx-auto">
        <div class="map m-auto">
          <PropertyMap markerData={data} />
        </div>
      </div>
    {/if}
  </div>
{/await}

<style>
  .map-container {
    height: 80vh;
    width: 60vw;
  }
  .map {
    height: 100%;
    width: 100%;
    position: relative;
  }
</style>
