<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="flex flex-col pl-4">
  <h2 class="card-title">Users</h2>
  {#each data.users as user}
    <div class="card card-compact w-96 bg-base-100 shadow-xl mb-2">
      <div class="card-body">
        <h2 class="card-title">ID: {user.id}</h2>
        <p class="text-base">{user.username}</p>
        <p class="text-base">{user.email}</p>
      </div>
    </div>
  {/each}
</div>
