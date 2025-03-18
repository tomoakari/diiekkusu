<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { isAuthenticated, getUserInfo } from '$lib/utils/auth';
  import { signOut, user } from '$lib/supabase';
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';
  
  // userストアを購読して、認証状態が変更されたときに自動的に更新されるようにする
  $: authenticated = !!$user;
  $: userInfo = $user;

  // ナビゲーションリンク
  const navLinks = [
    { href: '/', label: 'ホーム' },
    { href: '/sjis2utf8', label: 'SJIS→UTF8変換', requireAuth: true },
    { href: '/utf82sjis', label: 'UTF8→SJIS変換', requireAuth: true }
  ];

  // ログアウト処理
  async function handleLogout() {
    await signOut();
    window.location.href = '/';
  }
</script>

<header class="bg-background border-b">
  <div class="container mx-auto px-4 py-3 flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <button 
        on:click={() => window.location.href = "/"} 
        class="text-xl font-semibold text-primary"
      >
        でいいえっくす
      </button>
    </div>

    <nav class="hidden md:flex items-center space-x-6">
      {#each navLinks as link}
        {#if !link.requireAuth || authenticated}
          <button 
            on:click={() => window.location.href = link.href}
            class={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              $page.url.pathname === link.href 
                ? "text-foreground" 
                : "text-muted-foreground"
            )}
          >
            {link.label}
          </button>
        {/if}
      {/each}
    </nav>

    <div class="flex items-center space-x-4">
      {#if authenticated}
        <div class="text-sm text-muted-foreground">
          {userInfo?.email || 'ユーザー'}
        </div>
        <Button variant="outline" size="sm" on:click={handleLogout}>
          ログアウト
        </Button>
      {:else}
        <Button 
          variant="outline" 
          size="sm" 
          on:click={() => window.location.href = "/login"}
        >
          ログイン
        </Button>
      {/if}
    </div>
  </div>
</header>
