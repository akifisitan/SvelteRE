<script lang="ts">
  import AdminSideMenu from "./AdminSideMenu.svelte";
</script>

<div class="flex">
  <div>
    <AdminSideMenu />
  </div>
  <div class="w-full">
    <slot />
  </div>
</div>
