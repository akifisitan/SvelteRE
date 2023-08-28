<script>
  import "leaflet/dist/leaflet.css";
  import { LeafletMap, Marker, TileLayer, Popup } from "svelte-leafletjs";
  import { centerLocation } from "$lib/constants";

  export let markerData;

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
</script>

<LeafletMap options={mapOptions}>
  <TileLayer url={tileUrl} options={tileLayerOptions} />
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
</LeafletMap>
