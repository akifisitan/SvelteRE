<script lang="ts">
  import { enhance } from "$app/forms";
  import toast from "svelte-french-toast";
  import type { ActionData, SubmitFunction } from "./$types.js";
  import { prepareToast } from "$lib/toast-utilities.js";

  export let form: ActionData;
  let signingUp = false;

  $: if (form?.error) {
    toast.error(form.error);
  }

  const register: SubmitFunction = ({ formData }) => {
    signingUp = true;

    return async ({ update, result }) => {
      await update();
      if (result.type === "error" || result.type === "failure") {
        signingUp = false;
      } else {
        prepareToast({
          message: "Account created successfully",
          type: "success",
        });
      }
    };
  };
</script>

<section class="min-h-16 pt-2 pb-8 flex items-center justify-center">
  <div class="container mx-auto w-full">
    <div
      class="container mx-auto w-full bg-gray-800 rounded-lg shadow border border-gray-400 md:mt-0 sm:max-w-md xl:p-0"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
          Sign Up
        </h1>
        <form method="POST" use:enhance={register} class="space-y-4 md:space-y-6">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-white"> Email</label>
            <input
              type="text"
              name="email"
              id="email"
              class="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter email"
              required
            />
            {#if form?.emailError}
              <p class="text-sm text-red-500">{form?.emailError}</p>
            {/if}
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-white">
              Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              class="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg block w-full p-2.5"
              required
            />
            {#if form?.passwordError}
              <p class="text-sm text-red-500">{form?.passwordError}</p>
            {/if}
          </div>
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-white">
              Username</label
            >
            <input
              type="text"
              name="username"
              id="username"
              class="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter username"
              required
            />
            {#if form?.usernameError}
              <p class="text-sm text-red-500">{form?.usernameError}</p>
            {/if}
          </div>
          <button
            type="submit"
            disabled={signingUp}
            class="bg-blue-600 hover:bg-blue-700 w-full disabled:cursor-not-allowed text-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {signingUp ? "Signing up..." : "Sign Up"}
          </button>
          <p class="text-sm font-light text-gray-400">
            Already have an account?{" "}
            <a href="/login" class="font-medium hover:underline text-blue-500">Login</a>
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
