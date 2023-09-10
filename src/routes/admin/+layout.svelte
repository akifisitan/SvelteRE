<script lang="ts">
  import AdminSideMenu from "./AdminSideMenu.svelte";
</script>

<div class="flex">
  <div class="px-2">
    <AdminSideMenu />
  </div>
  <div class="w-full">
    <slot />
  </div>
</div>
