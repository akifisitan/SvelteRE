<script>
  import { goto } from "$app/navigation";
  import * as api from "$lib/api";

  export let data;

  async function del() {
    // delete the property
    // const response = await api.del("Property", { id: data.property.id });
    goto("/dashboard", { replaceState: true });
  }

  function cancel() {
    goto("./", { replaceState: true });
  }
</script>

<div>
  <p>Are you sure you want to delete this property?</p>
  <button on:click={del} class="btn btn-warning">Yes</button>
  <button on:click={cancel} class="btn btn-success">No</button>
</div>
