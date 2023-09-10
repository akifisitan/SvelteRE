<script lang="ts">
  import type { DetailedProperty } from "$lib/types";
  import type { MapOptions, TileLayerOptions } from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { LeafletMap, Marker, TileLayer, Popup } from "svelte-leafletjs";

  export let property: DetailedProperty;

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerOptions: TileLayerOptions = {
    minZoom: 6,
    maxZoom: 15,
  };
  const mapOptions: MapOptions = {
    center: [property.latitude, property.longitude],
    zoom: 6,
    attributionControl: false,
    scrollWheelZoom: true,
    dragging: true,
  };
</script>

<div class="map-container mx-auto">
  <div class="map m-auto">
    <LeafletMap options={mapOptions}>
      <TileLayer url={tileUrl} options={tileLayerOptions} />
      <Marker latLng={[property.latitude, property.longitude]}>
        <Popup>This is where the property is located</Popup>
      </Marker>
    </LeafletMap>
  </div>
</div>

<style>
  .map-container {
    height: 35vw;
    width: 55vw;
    display: flex;
  }
  .map {
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
  }
</style>
