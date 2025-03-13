<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Card, CardContent } from '$lib/components/ui/card';
  import { cn } from '$lib/utils';

  export let title: string = 'ファイルをドロップしてください';
  export let description: string = '';
  export let acceptedFileTypes: string[] = [];
  
  let isDragging = false;
  let errorMessage = '';
  
  const dispatch = createEventDispatcher<{
    drop: File;
    error: string;
  }>();
  
  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }
  
  function handleDragEnter(event: DragEvent) {
    event.preventDefault();
    isDragging = true;
  }
  
  function handleDragLeave(event: DragEvent) {
    event.preventDefault();
    isDragging = false;
  }
  
  function handleDrop(event: DragEvent) {
    event.preventDefault();
    isDragging = false;
    errorMessage = '';
    
    if (!event.dataTransfer) {
      errorMessage = 'ファイルが見つかりませんでした。';
      dispatch('error', errorMessage);
      return;
    }
    
    if (event.dataTransfer.files.length === 0) {
      errorMessage = 'ファイルが見つかりませんでした。';
      dispatch('error', errorMessage);
      return;
    }
    
    const file = event.dataTransfer.files[0];
    
    // ファイルタイプのチェック（指定がある場合）
    if (acceptedFileTypes.length > 0) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
      if (!acceptedFileTypes.includes(fileExtension)) {
        errorMessage = `サポートされていないファイル形式です。サポートされている形式: ${acceptedFileTypes.join(', ')}`;
        dispatch('error', errorMessage);
        return;
      }
    }
    
    dispatch('drop', file);
  }
</script>

<div>
  <Card class={cn(
    "border-2 border-dashed transition-colors cursor-pointer",
    isDragging ? "border-primary bg-muted/50" : "border-muted-foreground/20 hover:border-muted-foreground/50"
  )}>
    <div
      class="flex flex-col items-center justify-center p-10 text-center"
      on:dragover={handleDragOver}
      on:dragenter={handleDragEnter}
      on:dragleave={handleDragLeave}
      on:drop={handleDrop}
      role="button"
      tabindex="0"
      aria-label="ファイルをドロップするエリア"
    >
      <div class="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 mb-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <h3 class="text-lg font-medium">{title}</h3>
        {#if description}
          <p class="text-sm">{description}</p>
        {/if}
        <p class="text-xs">ファイルをドラッグ＆ドロップしてください</p>
        {#if errorMessage}
          <p class="text-sm text-destructive mt-2">{errorMessage}</p>
        {/if}
      </div>
    </div>
  </Card>
</div>
