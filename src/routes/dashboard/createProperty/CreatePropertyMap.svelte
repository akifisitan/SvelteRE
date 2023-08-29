<script>
  import "leaflet/dist/leaflet.css";
  import { LeafletMap, Marker, TileLayer, Popup } from "svelte-leafletjs";
  import { centerLocation, isWithinTurkeyBounds } from "$lib/constants";

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerOptions = {
    minZoom: 5,
    maxZoom: 7,
  };
  const mapOptions = {
    center: centerLocation,
    zoom: 5,
    zoomControl: false,
    attributionControl: false,
  };
  let leafletMap;
  let marker;
  export let latitude;
  export let longitude;

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

<div class="map-container mx-auto">
  <div class="map m-auto">
    <LeafletMap bind:this={leafletMap} options={mapOptions}>
      <TileLayer url={tileUrl} options={tileLayerOptions} />
      <Marker
        events={["dragend"]}
        bind:this={marker}
        latLng={centerLocation}
        on:dragend={updateMarker}
        options={{ draggable: true }}
      />
    </LeafletMap>
  </div>
</div>

<style>
  .map-container {
    height: 60vh;
    width: 50vw;
  }
  .map {
    height: 100%;
    width: 100%;
  }
</style>
