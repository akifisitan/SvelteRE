<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { handleStoredToast, prepareToast } from "$lib/toast-utilities";

  $: {
    if (!$page.data.user) {
      handleStoredToast();
    }
  }
</script>

<nav class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown dropdown-bottom dropdown-hover">
      <label for="dropdown" tabindex="-1" class="btn btn-ghost sm:hidden">
        <input id="dropdown" type="checkbox" hidden />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          /></svg
        >
      </label>
      <ul
        tabindex="-1"
        class="dropdown-content z-[1000] menu p-2 shadow bg-base-100 rounded-box w-fit"
      >
        <li><a href="/map" class="btn btn-ghost normal-case text-base pt-3"> Map </a></li>
        {#if $page.data.user}
          <li>
            <a href="/dashboard" class="btn btn-ghost normal-case text-base pt-3">Dashboard</a>
          </li>
        {/if}
      </ul>
    </div>
    <a href="/" class="btn btn-ghost font-bold normal-case text-lg" style="color:#0DD982">
      SvelteRE
    </a>
    <a href="/map" class="btn btn-ghost normal-case text-base hidden sm:flex"> Map </a>
    {#if $page.data.user}
      <a href="/dashboard" class="btn btn-ghost normal-case text-base hidden sm:flex">Dashboard</a>
    {/if}
  </div>

  <div class="navbar-end">
    {#if $page.data.user}
      <div class="dropdown dropdown-bottom dropdown-end dropdown-hover">
        <button class="btn btn-ghost normal-case text-base">{$page.data.user.username}</button>
        <ul
          tabindex="-1"
          class="dropdown-content z-[1000] menu p-2 shadow bg-base-100 rounded-box w-44"
        >
          {#if $page.data.user.roles.includes("Admin")}
            <li>
              <a
                href="/admin"
                class="inline-flex justify-center items-center text-center normal-case text-base font-semibold"
              >
                Admin Dashboard</a
              >
            </li>
          {/if}
          <li>
            <a
              href="/dashboard/properties"
              class="inline-flex justify-center items-center text-center normal-case text-base font-semibold"
            >
              My Properties</a
            >
          </li>
          <li>
            <a
              href="/dashboard/properties/create"
              class="inline-flex justify-center items-center text-center normal-case text-base font-semibold"
            >
              New Property</a
            >
          </li>
          <li>
            <form class="flex" action="/logout" method="POST" use:enhance>
              <button
                type="submit"
                on:click={() =>
                  prepareToast({ message: "Logged out successfully", type: "success" })}
                class="normal-case w-full h-full text-base font-semibold text-red-700"
              >
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
