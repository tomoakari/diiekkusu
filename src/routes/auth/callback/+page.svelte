<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase, user } from '$lib/supabase';

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
      }).then(({ data }) => {
        // ユーザーストアを明示的に更新
        if (data.session?.user) {
          user.set(data.session.user);
          console.log('User authenticated:', data.session.user);
        }
        
        // ホームページにリダイレクト（ページをリロードするためにwindow.location.hrefを使用）
        window.location.href = '/';
      });
    } else {
      // エラーがある場合はログインページにリダイレクト（ページをリロードするためにwindow.location.hrefを使用）
      window.location.href = '/login';
    }
  });
</script>

<div class="flex items-center justify-center min-h-screen">
  <div class="text-center">
    <h1 class="text-2xl font-bold mb-4">認証中...</h1>
    <p class="text-muted-foreground">しばらくお待ちください。自動的にリダイレクトします。</p>
  </div>
</div>
