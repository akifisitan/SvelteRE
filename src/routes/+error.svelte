<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="flex flex-col">
  <h1 class="mx-auto" style="font-size: 3em">{$page.status}</h1>
  <span class="mx-auto" style="font-size: 5em">
    {$page.error?.message}
  </span>
</div>
