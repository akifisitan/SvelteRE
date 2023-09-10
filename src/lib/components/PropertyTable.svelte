<script lang="ts">
  import type { ShowcaseProperty } from "$lib/types";

  export let properties: ShowcaseProperty[];
  export let path: string;
</script>

<div class="property-table">
  {#if properties}
    {#each properties as property}
      <div>
        <a href="{path}{property.id}">
          <img src={property.thumbnail} alt="{property.type} {property.status}" />
        </a>
        <p class="text-center">
          {property.type}
          {`(${property.status})`}
          <br />
          {property.price}
          {property.currency}
        </p>
      </div>
    {/each}
  {/if}
</div>

<style>
  .property-table {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }
  img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: fill;
  }
</style>
