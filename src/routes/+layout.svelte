<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import "../app.css";
</script>

<nav class="navbar bg-base-100">
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost font-bold normal-case text-lg"> RealEstate </a>
    <a href="/map" class="btn btn-ghost normal-case text-base"> Map </a>
    <a href="/dashboard" class="btn btn-ghost normal-case text-base"> Dashboard </a>
  </div>
  <div class="navbar-end">
    {#if $page.data.user}
      {#if $page.data.user.roles.includes("Admin")}
        <a href="/admin" class="btn btn-ghost normal-case text-base"> Admin </a>
      {/if}
      <p class="btn btn-ghost normal-case text-base">{$page.data.user.username}</p>
      <form class="logout" action="/logout" method="POST" use:enhance>
        <button type="submit" class="btn btn-ghost normal-case text-base"> Logout </button>
      </form>
    {:else}
      <a href="/login" class="btn btn-ghost normal-case text-base"> Login </a>
    {/if}
  </div>
</nav>

<main>
  <slot />
</main>
