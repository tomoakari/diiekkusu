<script lang="ts">
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { isAuthenticated } from '$lib/utils/auth';
</script>

<div class="space-y-8">
  <section class="text-center space-y-4">
    <h1 class="text-4xl font-bold tracking-tight">ディーエックス</h1>
    <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
      シンプルで使いやすい文字コード変換ツール
    </p>
  </section>

  <section class="max-w-4xl mx-auto">
    <div class="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>SJIS → UTF-8 変換</CardTitle>
          <CardDescription>
            Shift-JIS形式のファイルをUTF-8形式に変換します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            テキストファイルの文字化けを解消したい場合に便利です。
            ドラッグ＆ドロップで簡単に変換できます。
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            class="w-full"
            on:click={() => {
              if (isAuthenticated()) {
                window.location.href = "/sjis2utf8";
              } else {
                window.location.href = "/login";
              }
            }}
          >
            {isAuthenticated() ? "変換する" : "ログインして変換する"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>UTF-8 → SJIS 変換</CardTitle>
          <CardDescription>
            UTF-8形式のファイルをShift-JIS形式に変換します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            古いシステムやソフトウェアで利用するファイルを準備する場合に便利です。
            ドラッグ＆ドロップで簡単に変換できます。
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            class="w-full"
            on:click={() => {
              if (isAuthenticated()) {
                window.location.href = "/utf82sjis";
              } else {
                window.location.href = "/login";
              }
            }}
          >
            {isAuthenticated() ? "変換する" : "ログインして変換する"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  </section>

  <section class="max-w-3xl mx-auto text-center space-y-4 py-8">
    <h2 class="text-2xl font-semibold">このサービスについて</h2>
    <div class="text-muted-foreground space-y-2">
      <p>
        ディーエックスは、文字コード変換を簡単に行うためのウェブサービスです。
        ファイルをドラッグ＆ドロップするだけで、Shift-JISとUTF-8の相互変換が可能です。
      </p>
      <p>
        ログインすることで、すべての機能を利用できます。
        変換されたファイルはサーバーに保存されず、ブラウザ上で処理されるため安全です。
      </p>
    </div>
  </section>
</div>
