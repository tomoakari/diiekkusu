<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import DropZone from '$lib/components/DropZone.svelte';
  import { processFile, convertUTF8ToSJIS } from '$lib/utils/encoding';
  
  let message = '';
  let isSuccess = false;
  
  async function handleFileDrop(event: CustomEvent<File>) {
    const file = event.detail;
    
    const result = await processFile(file, convertUTF8ToSJIS, 'UTF-8');
    
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
    <h1 class="text-3xl font-bold">UTF-8 → SJIS 変換</h1>
    <p class="text-muted-foreground">
      UTF-8形式のファイルをShift-JIS形式に変換します
    </p>
  </div>
  
  <Card>
    <CardHeader>
      <CardTitle>ファイルを選択</CardTitle>
      <CardDescription>
        変換したいUTF-8形式のファイルをドラッグ＆ドロップしてください
      </CardDescription>
    </CardHeader>
    <CardContent>
      <DropZone
        title="UTF-8形式のファイルをドラッグアンドドロップしてください"
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
      <li>変換したいUTF-8形式のファイルを上記のエリアにドラッグ＆ドロップします。</li>
      <li>ファイルの文字コードが自動的に検出され、UTF-8であることが確認されます。</li>
      <li>変換が完了すると、Shift-JIS形式のファイルが自動的にダウンロードされます。</li>
    </ol>
    <p class="mt-4">
      <strong>注意:</strong> ファイルはブラウザ上で処理され、サーバーにアップロードされることはありません。
    </p>
    <p>
      <strong>注意:</strong> UTF-8からShift-JISへの変換では、Shift-JISで表現できない文字（一部の絵文字や特殊文字など）は変換できない場合があります。
    </p>
  </div>
</div>
