<script>
  import { page } from "$app/stores";
</script>

<div class="flex flex-col">
  <h1 class="mx-auto">{$page.status} {$page.error.message}</h1>
  <span class="mx-auto" style="font-size: 10em">
    {$page.status}
  </span>
</div>
