<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
</script>

<nav class="navbar bg-base-100">
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost font-bold normal-case text-lg text-orange-600"> SvelteRE </a>
    <a href="/map" class="btn btn-ghost normal-case text-base"> Map </a>
    {#if $page.data.user}
      <a href="/dashboard" class="btn btn-ghost normal-case text-base">Dashboard</a>
    {/if}
  </div>
  <div class="navbar-end">
    {#if $page.data.user}
      <div class="dropdown dropdown-bottom dropdown-end dropdown-hover">
        <button class="btn btn-ghost normal-case text-base">{$page.data.user.username}</button>
        <ul
          tabindex="-1"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {#if $page.data.user.roles.includes("Admin")}
            <li><a href="/admin" class="normal-case text-base"> Admin Dashboard</a></li>
          {/if}
          <li><a href="/dashboard/properties" class="normal-case text-base"> My Properties</a></li>
          <li>
            <a href="/dashboard/properties/create" class="normal-case text-base"> New Property</a>
          </li>
          <li>
            <form action="/logout" method="POST" use:enhance>
              <button type="submit" class="text-center normal-case text-base text-red-700">
                Logout
              </button>
            </form>
          </li>
        </ul>
      </div>
    {:else}
      <a href="/login" class="btn btn-ghost normal-case text-base"> Login </a>
    {/if}
  </div>
</nav>
