<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { isAuthenticated } from '$lib/utils/auth';
  import { user } from '$lib/supabase';
  
  // userストアを購読して、認証状態が変更されたときに自動的に更新されるようにする
  $: authenticated = !!$user;
  
  onMount(() => {
    // クライアントサイドでも認証チェック
    if (!authenticated) {
      window.location.href = '/login';
    }
  });
  
  // 認証状態が変更されたときにも認証チェックを行う
  $: if (typeof window !== 'undefined' && !authenticated) {
    window.location.href = '/login';
  }
</script>

<slot />
