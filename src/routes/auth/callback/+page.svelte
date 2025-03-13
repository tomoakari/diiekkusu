<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';

  onMount(() => {
    // URLからハッシュフラグメントを取得
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');

    if (accessToken && refreshToken) {
      // セッションを設定
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      }).then(() => {
        // ホームページにリダイレクト
        goto('/');
      });
    } else {
      // エラーがある場合はログインページにリダイレクト
      goto('/login');
    }
  });
</script>

<div class="flex items-center justify-center min-h-screen">
  <div class="text-center">
    <h1 class="text-2xl font-bold mb-4">認証中...</h1>
    <p class="text-muted-foreground">しばらくお待ちください。自動的にリダイレクトします。</p>
  </div>
</div>
