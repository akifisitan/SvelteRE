<script lang="ts">
  import ImageCarousel from "$lib/components/ImageCarousel.svelte";
  import StaticMap from "$lib/components/StaticMap.svelte";
  import { formatDate } from "$lib/date";
  import type { PageData } from "./$types";

  export let data: PageData;
  const property = data?.property;
</script>

<div class="px-8">
  <div class="sm:text-lg">
    <div class="py-2">
      <h2 class="font-bold">Owner Info</h2>
      <p>
        {property.owner.username}<br />{property.owner.email}
      </p>
    </div>
    <div class="py-2">
      <h2 class="font-bold">Listing Date</h2>
      <p>
        {formatDate(property.startDate, "dd/MM/yyyy")} - {formatDate(
          property.endDate,
          "dd/MM/yyyy"
        )}
      </p>
    </div>
    <div class="py-2">
      <h2 class="font-bold">Property Info</h2>
      <p>
        {property.type}
      </p>
      <p>
        {property.status}
      </p>
      <p>
        {property.price}
        {property.currency}
      </p>
    </div>
  </div>
</div>

<div class="flex flex-col pt-2">
  <div class="flex mx-auto"><p class="font-bold sm:text-lg">Property Images</p></div>
  <ImageCarousel property={data.property} />
</div>

<div class="flex flex-col pb-8">
  <div class="flex mx-auto py-4"><p class="font-bold sm:text-lg">Property Location</p></div>
  <StaticMap {property} />
</div>
