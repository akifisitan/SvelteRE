<script>
  export let data;
  const property = data?.property;
</script>

<a href="./{property.id}/edit" class="btn btn-primary">Edit</a>
<a href="./{property.id}/delete" class="btn btn-warning">Delete</a>
<p>Property Details Page</p>
<p>
  Type: {property.type}
  Price: {property.price}
  Status: {property.status}
  Start Date: {property.startDate}
  End Date: {property.endDate}
  Location: Latitude: {property.latitude}
  Longitude: {property.longitude}
</p>

<div>
  {#each property.images as image}
    <img src={image} alt="{property.type}{property.status}" />
  {/each}
</div>
