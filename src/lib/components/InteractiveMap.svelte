<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { LeafletMap, Marker, TileLayer } from "svelte-leafletjs";
  import { isWithinTurkeyBounds } from "$lib/constants";
  import type { MapOptions, TileLayerOptions } from "leaflet";

  export let latitude: number;
  export let longitude: number;
  let leafletMap: LeafletMap;
  let marker: Marker;

  const mapOptions: MapOptions = {
    center: [latitude, longitude],
    zoom: 5,
    zoomControl: false,
    attributionControl: false,
  };

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerOptions: TileLayerOptions = {
    minZoom: 5,
    maxZoom: 7,
  };

  function updateMarker() {
    const m = marker.getMarker();
    const markerData = m.getLatLng();
    if (isWithinTurkeyBounds(markerData.lat, markerData.lng)) {
      leafletMap.getMap().setView(markerData);
      latitude = markerData.lat;
      longitude = markerData.lng;
    } else {
      m.setLatLng([latitude, longitude]);
      leafletMap.getMap().setView([latitude, longitude]);
    }
  }
</script>

<div class="map m-auto">
  <LeafletMap bind:this={leafletMap} options={mapOptions}>
    <TileLayer url={tileUrl} options={tileLayerOptions} />
    <Marker
      events={["dragend"]}
      bind:this={marker}
      latLng={[latitude, longitude]}
      on:dragend={updateMarker}
      options={{ draggable: true }}
    />
  </LeafletMap>
</div>

<style>
  .map {
    height: 100%;
    width: 100%;
  }
</style>
