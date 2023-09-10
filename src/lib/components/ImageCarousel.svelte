<script>
  import Carousel from "svelte-carousel";
  export let property;
</script>

<div class="flex flex-col p-2">
  <div class="flex align-middle justify-center h-full p-2">
    <div class="flex align-middle justify-center w-4/5 max-w-lg">
      <Carousel>
        {#each property.images as image}
          <div>
            <img src={image.value} alt="{property.type} {property.status}" class="mx-auto w-full" />
          </div>
        {/each}
      </Carousel>
    </div>
  </div>
</div>
