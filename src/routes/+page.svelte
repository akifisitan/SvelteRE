<script>
  export let data;
</script>

<div class="grid grid-cols-5 gap-x-2 gap-y-2">
  {#each data.propertyList as entry}
    <div>
      <a href="/property/{entry.id}">
        <img
          class="block m-auto cursor-pointer w-32 h-24"
          src={`data:image/jpeg;base64,${entry.thumbnail}`}
          alt="property"
        />
      </a>
      <p class="text-center">
        {entry.type}
        {`(${entry.status})`}
        <br />
        {entry.price}
        {`(${entry.currency})`}
      </p>
    </div>
  {/each}
</div>
