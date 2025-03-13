<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="min-h-screen flex flex-col">
  <Navbar />
  <main class="flex-1 container mx-auto px-4 py-8">
    <slot />
  </main>
  <footer class="bg-muted py-6">
    <div class="container mx-auto px-4 text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} ディーエックス - 文字コード変換ツール</p>
    </div>
  </footer>
</div>
