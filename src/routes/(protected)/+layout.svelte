<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { isAuthenticated } from '$lib/utils/auth';
  
  onMount(() => {
    // クライアントサイドでも認証チェック
    if (!isAuthenticated()) {
      goto('/login');
    }
  });
</script>

<slot />
