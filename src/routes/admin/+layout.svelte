<script lang="ts">
  import AdminSideMenu from "./AdminSideMenu.svelte";
</script>

<div class="flex">
  <div class="flex basis-36">
    <AdminSideMenu />
  </div>
  <div class="flex basis-4/5">
    <slot />
  </div>
</div>
