<script lang="ts">
  import ImageCarousel from "$lib/components/ImageCarousel.svelte";
  import StaticMap from "$lib/components/StaticMap.svelte";
  import { formatDate } from "$lib/date";
  import type { PageData } from "./$types";

  export let data: PageData;
  const property = data?.property;
</script>

<div class="px-8">
  <div class="text-xl">
    <h2 class="text-2xl font-bold pt-2">Listing Date</h2>
    <p class="text-lg pb-2">
      {formatDate(property.startDate, "dd/MM/yyyy")} - {formatDate(property.endDate, "dd/MM/yyyy")}
    </p>
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
    <p>Owner: {property.owner}</p>
  </div>
</div>

<ImageCarousel property={data.property} />

<div class="flex flex-col pb-8">
  <div class="flex mx-auto py-4"><p class="text-lg">Map Location</p></div>
  <StaticMap {property} />
</div>
