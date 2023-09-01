<script>
  import "leaflet/dist/leaflet.css";
  import { LeafletMap, Marker, TileLayer, Popup } from "svelte-leafletjs";

  export let property;

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerOptions = {
    minZoom: 6,
    maxZoom: 15,
  };
  const mapOptions = {
    center: [property.latitude, property.longitude],
    zoom: 6,
    scrollWheelZoom: false,
    attributionControl: false,
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
    height: 80vh;
    width: 60vw;
  }
  .map {
    height: 100%;
    width: 100%;
    position: relative;
  }
</style>
