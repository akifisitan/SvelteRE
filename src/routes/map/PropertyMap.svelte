<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { LeafletMap, Marker, TileLayer, Popup } from "svelte-leafletjs";
  import { centerLat, centerLong } from "$lib/constants";
  import type { MarkerData } from "$lib/types";
  import type { MapOptions, TileLayerOptions } from "leaflet";

  export let markerData: MarkerData[];

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerOptions: TileLayerOptions = {
    minZoom: 5,
    maxZoom: 7,
  };
  const mapOptions: MapOptions = {
    center: [centerLat, centerLong],
    zoom: 5,
    zoomControl: false,
    attributionControl: false,
  };
</script>

<div class="map-container">
  <div class="map m-auto">
    <LeafletMap options={mapOptions}>
      <TileLayer url={tileUrl} options={tileLayerOptions} />
      {#if markerData}
        {#each markerData as property}
          <Marker latLng={[property.latitude, property.longitude]}>
            <Popup
              >Price: {property.price} ({property.currency})<br /> Status:{" "}
              {property.status}
              <br />
              Type: {property.type}
              <br />
              <a href="/property/{property.id}">Details</a>
            </Popup>
          </Marker>
        {/each}
      {/if}
    </LeafletMap>
  </div>
</div>

<style>
  .map-container {
    height: 89vh;
    width: 100vw;
  }
  .map {
    height: 100%;
    width: 100%;
    position: relative;
  }
  @media (max-width: 768px) {
    .map-container {
      padding-top: 3em;
      height: 45vh;
      width: 100vw;
    }
  }
</style>
