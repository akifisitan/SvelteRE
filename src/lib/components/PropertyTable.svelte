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
          <img class="m-auto w-32 h-24" src={property.thumbnail} alt="Property View" />
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
    column-gap: 0.5rem;
    row-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(5rem, 10rem));
  }
</style>
