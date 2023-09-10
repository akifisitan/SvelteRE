<script lang="ts">
  import Carousel from "svelte-carousel";
  import type { MouseEventHandler } from "svelte/elements";
  export let modal: HTMLDialogElement;
  export let images: FileList | null;
  export let loading: boolean = false;
  export let confirmFunction: MouseEventHandler<HTMLButtonElement> | null = null;

  function setImages(event: Event) {
    const target = event.target as HTMLInputElement;
    images = target.files;
  }
</script>

<dialog bind:this={modal} class="modal text-left">
  <div class="modal-box">
    <h3 class="font-bold text-lg pb-2">Select Images</h3>
    {#if images && images.length > 0}
      <div class="py-2">
        {#key images}
          <Carousel>
            {#each images as image}
              <div class="carousel-item">
                <img class="block w-96 h-72" src={URL.createObjectURL(image)} alt={image.name} />
              </div>
            {/each}
          </Carousel>
        {/key}
      </div>
    {/if}
    <input
      type="file"
      name="Images"
      id="images"
      multiple={true}
      accept=".jpg, .jpeg, .png"
      class="file-input file-input-bordered file-input-sm w-full max-w-xs"
      on:change={setImages}
    />
    <div class="modal-action">
      <form method="dialog">
        {#if confirmFunction === null}
          <button class="btn btn-success">Confirm</button>
        {:else}
          <button
            on:click|preventDefault={confirmFunction}
            disabled={loading}
            class="btn btn-success"
            >{loading ? "Adding..." : "Add"}
          </button>
          <button class="btn btn-neutral" disabled={loading}>Cancel</button>
        {/if}
      </form>
    </div>
  </div>
</dialog>
