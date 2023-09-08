<script lang="ts">
  import InteractiveMap from "./InteractiveMap.svelte";
  export let modal: HTMLDialogElement;
  export let latitude: number;
  export let longitude: number;
</script>

<dialog bind:this={modal} class="modal text-left">
  <div class="modal-box">
    <div class="small-map">
      <InteractiveMap bind:latitude bind:longitude />
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-success">Confirm</button>
      </form>
    </div>
  </div>
</dialog>

<style>
  .small-map {
    width: 100%;
    height: 50vh;
  }
</style>
