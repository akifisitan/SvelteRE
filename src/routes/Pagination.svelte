<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  export let queryString: string;
</script>

<div class="flex flex-row w-full pt-2">
  <div class="join w-fit mx-auto justify-center">
    {#if data.maxPage > 0}
      {#if data.currentPage === 1}
        <button disabled class="join-item btn w-1/6"> « </button>
      {:else}
        <a class="join-item btn w-1/6" href="/?page={data.currentPage - 1}{queryString}"> « </a>
      {/if}
      <button class="join-item btn w-2/5">
        Page {data.currentPage} / {data.maxPage}
      </button>
      {#if data.currentPage === data.maxPage}
        <button disabled class="join-item btn w-1/6"> » </button>
      {:else}
        <a class="join-item btn w-1/6" href="/?page={data.currentPage + 1}{queryString}"> » </a>
      {/if}
    {:else}
      <button disabled class="join-item btn w-1/6"> « </button>
      <button class="join-item btn w-2/5"> Page 1 / 1 </button>
      <button disabled class="join-item btn w-1/6"> » </button>
    {/if}
  </div>
</div>
