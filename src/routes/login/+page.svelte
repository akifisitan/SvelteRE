<script lang="ts">
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  import { invalidateAll } from "$app/navigation";
  import { toast } from "svelte-french-toast";
  import type { SubmitFunction } from "@sveltejs/kit";
  import type { ActionData } from "./$types";
  import { handleStoredToast, prepareToast } from "$lib/toast-utilities";

  export let form: ActionData;
  let loggingIn = false;

  $: if (form?.error) {
    toast.error(form.error);
  }

  onMount(() => {
    invalidateAll();
    handleStoredToast();
  });

  const login: SubmitFunction = ({ formData }) => {
    loggingIn = true;

    return async ({ update, result }) => {
      await update();
      if (result.type === "error" || result.type === "failure") {
        loggingIn = false;
      } else {
        prepareToast({
          message: `Logged in as ${formData.get("username")}`,
          type: "success",
        });
      }
    };
  };
</script>

<section class="min-h-16 pt-8 flex items-center justify-center">
  <div class="container mx-auto w-full">
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
            disabled={loggingIn}
            class="bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 w-full disabled:cursor-not-allowed text-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {loggingIn ? "Logging in..." : "Login"}
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

<style>
  @media (max-width: 768px) {
    section {
      padding: 3rem;
    }
  }
</style>
