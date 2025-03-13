<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { isAuthenticated, getUserInfo } from '$lib/utils/auth';
  import { signOut } from '$lib/supabase';
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';

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
      <a href="/" class="text-xl font-semibold text-primary">ディーエックス</a>
    </div>

    <nav class="hidden md:flex items-center space-x-6">
      {#each navLinks as link}
        {#if !link.requireAuth || isAuthenticated()}
          <a 
            href={link.href} 
            class={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              $page.url.pathname === link.href 
                ? "text-foreground" 
                : "text-muted-foreground"
            )}
          >
            {link.label}
          </a>
        {/if}
      {/each}
    </nav>

    <div class="flex items-center space-x-4">
      {#if isAuthenticated()}
        <div class="text-sm text-muted-foreground">
          {getUserInfo()?.email || 'ユーザー'}
        </div>
        <Button variant="outline" size="sm" on:click={handleLogout}>
          ログアウト
        </Button>
      {:else}
        <Button variant="outline" size="sm" href="/login">
          ログイン
        </Button>
      {/if}
    </div>
  </div>
</header>
