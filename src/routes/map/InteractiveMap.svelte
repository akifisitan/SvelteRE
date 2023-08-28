<script>
  import "leaflet/dist/leaflet.css";
  import { LeafletMap, Marker, TileLayer, Popup } from "svelte-leafletjs";
  import { centerLat, centerLong, centerLocation, isWithinTurkeyBounds } from "$lib/constants";
  import * as api from "$lib/api";

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerOptions = {
    minZoom: 5,
    maxZoom: 7,
  };
  const mapOptions = {
    center: centerLocation,
    zoom: 6,
    zoomControl: false,
    attributionControl: false,
  };
  let leafletMap;
  let marker;
  let pickedLat = centerLat;
  let pickedLong = centerLong;
  let loading = true;
  function updateMarker() {
    const m = marker.getMarker();
    const markerData = m.getLatLng();
    if (isWithinTurkeyBounds(markerData.lat, markerData.lng)) {
      leafletMap.getMap().setView(markerData);
      pickedLat = markerData.lat;
      pickedLong = markerData.lng;
    } else {
      m.setLatLng([pickedLat, pickedLong]);
      leafletMap.getMap().setView([pickedLat, pickedLong]);
    }
  }
</script>

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
