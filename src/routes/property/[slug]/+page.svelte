<script>
  export let data;
  const property = data?.property;
</script>

<div>
  <div>
    <div class="text-lg p-4">
      <p>
        Listing Date Range: {property.startDate} - {property.endDate}
      </p>
      <p>Property Type: {property.propertyType.value}</p>
      <p>Property Status: {property.propertyStatus.value}</p>
      <p>
        Price: {property.price}
        {`(${property.currency.value})`}
      </p>
    </div>
    <div class="flex">
      <div class="carousel carousel-end rounded-box mx-auto">
        {#each property.propertyImages as image}
          <div class="carousel-item">
            <img
              class="block w-96 h-72"
              src={`data:image/jpeg;base64,${image.value}`}
              alt="Property"
            />
          </div>
        {/each}
      </div>
    </div>
    <div class="mt-4 items-center">
      <!-- <h1 class="text-center">Map Location</h1>
      <DetailMap lat={latitude} long={longitude}>
        <Marker position={[latitude, longitude]}>
          <Popup>This is where the property is located.</Popup>
        </Marker>
      </DetailMap> -->
    </div>
  </div>
</div>
