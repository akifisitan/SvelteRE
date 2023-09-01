<script>
  import Map from "./Map.svelte";
  export let data;
  const property = data?.property;
</script>

<div>
  <div>
    <div class="text-lg p-4">
      <p>
        Listing Date Range: {property.startDate} - {property.endDate}
      </p>
      <p>Property Type: {property.type}</p>
      <p>Property Status: {property.status}</p>
      <p>
        Price: {property.price}
        {`(${property.currency})`}
      </p>
    </div>
    <div class="flex">
      <div class="carousel carousel-end rounded-box mx-auto">
        {#each property.images as image (image)}
          <div class="carousel-item">
            <img class="block w-96 h-72" src={image.value} alt="Property" />
          </div>
        {/each}
      </div>
    </div>
    <div class="mt-4 items-center">
      <Map {property} />
    </div>
  </div>
</div>
