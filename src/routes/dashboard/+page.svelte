<script>
  export let data;
</script>

<div class="flex flex-col">
  <div class="p-2">
    <h2 class="text-xl inline-block mr-2 align-middle">Properties</h2>
    <a href="{data.currentRoute}/createProperty" class="btn btn-accent btn-sm"> Create New </a>
  </div>
  <div>
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
  </div>
  <div class="mx-auto">Analytics Here</div>
</div>
