<script type="ts">
  import "leaflet/dist/leaflet.css";
  import * as api from "$lib/api";
  import PropertyMap from "./PropertyMap.svelte";

  async function getMarkers() {
    const response = await api.get(fetch, "Property/getAllMapData");
    return response.data;
  }
</script>

<div class="flex flex-row justify-center align-center">
  <div class="flex flex-col justify-center align-center">
    {#await getMarkers()}
      <div class="mx-auto">Loading map data</div>
      <span class="mt-4 mx-auto loading loading-spinner loading-lg text-accent" />
    {:then data}
      <PropertyMap markerData={data} />
    {:catch error}
      <div class="mx-auto">Error loading map data</div>
    {/await}
  </div>
</div>
