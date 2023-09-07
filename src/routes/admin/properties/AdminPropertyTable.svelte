<script lang="ts">
  import type { ShowcaseProperty } from "$lib/types";

  export let properties: ShowcaseProperty[];
</script>

<div class="grid grid-cols-6 gap-x-2 gap-y-2 pr-4 pt-8">
  {#if properties}
    {#each properties as property}
      <div>
        <a href="/dashboard/properties/{property.id}">
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
