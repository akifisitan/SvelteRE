<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "./$types.js";
  import { onMount } from "svelte";
  import { invalidateAll } from "$app/navigation";

  export let form;
  let accountCreated = $page.url.searchParams?.get("accountCreated") !== null;
  let loading = false;

  onMount(() => {
    invalidateAll();
  });

  const login: SubmitFunction = (input) => {
    loading = true;

    return async ({ update }) => {
      await update();
      loading = false;
    };
  };
</script>

<section class="min-h-16 pt-8 flex items-center justify-center">
  <div class="container mx-auto w-full">
    {#if accountCreated}
      <div
        class="container flex items-center justify-center text-white mx-auto min-h-12 mb-4 bg-green-800 rounded-lg shadow border border-gray-400 md:mt-0 sm:max-w-md xl:p-0"
      >
        <p>Account created successfully</p>
      </div>
    {/if}
    {#if form?.error}
      <div
        class="container flex items-center justify-center text-white mx-auto min-h-12 mb-4 bg-red-900 rounded-lg shadow border border-gray-400 md:mt-0 sm:max-w-md xl:p-0"
      >
        <p>{form.error}</p>
      </div>
    {/if}
    <div
      class="container mx-auto w-full bg-gray-800 rounded-lg shadow border border-gray-400 md:mt-0 sm:max-w-md xl:p-0"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">Login</h1>
        <form method="POST" use:enhance={login} class="space-y-4 md:space-y-6">
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-white">
              Username</label
            >
            <input
              type="text"
              name="username"
              id="username"
              required
              class="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-white">
              Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter Password"
              class="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            class="bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 w-full disabled:cursor-not-allowed text-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p class="text-sm font-light text-gray-400">
            Don’t have an account yet?{" "}
            <a href="/signup" class="font-medium hover:underline text-blue-500">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
