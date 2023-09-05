<script>
  import StaticMap from "$lib/components/StaticMap.svelte";
  import { formatDate } from "$lib/date";

  export let data;
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

<div class="flex flex-col">
  <div class="flex mx-auto py-4"><p class="text-lg">Image Gallery</p></div>
  <div class="flex mx-auto content-center justify-center">
    <div class="carousel w-1/2 border-8 rounded-md border-gray-800">
      {#each property.images as image, index (image.id)}
        <div id="slide{index}" class="carousel-item relative w-full">
          <img
            src={image.value}
            alt="{property.type}{property.status}"
            class="w-full aspect-video"
          />
          <div
            class="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2"
          >
            <a href="#slide{index - 1}" class="btn btn-circle {index === 0 ? 'invisible' : null}"
              >❮</a
            >
            {#if index !== property.images.length - 1}
              <a href="#slide{index + 1}" class="btn btn-circle">❯</a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="flex flex-col pb-8">
  <div class="flex mx-auto py-4"><p class="text-lg">Map Location</p></div>
  <StaticMap {property} />
</div>
