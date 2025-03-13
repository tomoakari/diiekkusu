<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import DropZone from '$lib/components/DropZone.svelte';
  import { processFile, convertSJISToUTF8 } from '$lib/utils/encoding';
  
  let message = '';
  let isSuccess = false;
  
  async function handleFileDrop(event: CustomEvent<File>) {
    const file = event.detail;
    
    const result = await processFile(file, convertSJISToUTF8, 'Shift_JIS');
    
    message = result.message;
    isSuccess = result.success;
    
    // 3秒後にメッセージをクリア
    if (result.success) {
      setTimeout(() => {
        message = '';
        isSuccess = false;
      }, 3000);
    }
  }
  
  function handleError(event: CustomEvent<string>) {
    message = event.detail;
    isSuccess = false;
  }
</script>

<div class="max-w-3xl mx-auto space-y-8">
  <div class="text-center space-y-2">
    <h1 class="text-3xl font-bold">SJIS → UTF-8 変換</h1>
    <p class="text-muted-foreground">
      Shift-JIS形式のファイルをUTF-8形式に変換します
    </p>
  </div>
  
  <Card>
    <CardHeader>
      <CardTitle>ファイルを選択</CardTitle>
      <CardDescription>
        変換したいShift-JIS形式のファイルをドラッグ＆ドロップしてください
      </CardDescription>
    </CardHeader>
    <CardContent>
      <DropZone
        title="SJIS形式のファイルをドラッグアンドドロップしてください"
        description="テキストファイル（.txt, .csv, .html, .xml, .json など）に対応しています"
        on:drop={handleFileDrop}
        on:error={handleError}
      />
      
      {#if message}
        <div class={`mt-4 p-3 rounded-md text-sm ${isSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      {/if}
    </CardContent>
  </Card>
  
  <div class="text-sm text-muted-foreground space-y-2">
    <h2 class="font-medium text-foreground">使い方</h2>
    <ol class="list-decimal list-inside space-y-1">
      <li>変換したいShift-JIS形式のファイルを上記のエリアにドラッグ＆ドロップします。</li>
      <li>ファイルの文字コードが自動的に検出され、Shift-JISであることが確認されます。</li>
      <li>変換が完了すると、UTF-8形式のファイルが自動的にダウンロードされます。</li>
    </ol>
    <p class="mt-4">
      <strong>注意:</strong> ファイルはブラウザ上で処理され、サーバーにアップロードされることはありません。
    </p>
  </div>
</div>
