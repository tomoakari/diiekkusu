# ディーエックス (Diiekkusu)

文字コード変換ツール - SJISとUTF-8の相互変換を簡単に行うウェブアプリケーション

## 概要

ディーエックスは、ファイルの文字コードを簡単に変換できるウェブアプリケーションです。Shift-JIS形式のファイルをUTF-8に変換したり、UTF-8形式のファイルをShift-JISに変換したりすることができます。

主な機能：
- Shift-JIS → UTF-8 変換
- UTF-8 → Shift-JIS 変換
- ドラッグ＆ドロップによる簡単なファイルアップロード
- ブラウザ上での処理（サーバーにファイルがアップロードされない）
- Googleアカウントによる認証

## 技術スタック

- フロントエンド: SvelteKit, TypeScript, Tailwind CSS, shadcn-svelte
- バックエンド: Supabase (認証)
- デプロイ: Google Cloud Run

## ローカル開発環境のセットアップ

### 前提条件

- Node.js 18以上
- npm 7以上

### インストール手順

1. リポジトリをクローン
```bash
git clone https://github.com/yourusername/diiekkusu.git
cd diiekkusu-app
```

2. 依存関係をインストール
```bash
npm install
```

3. 環境変数を設定
`.env`ファイルを作成し、以下の内容を設定します：
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. 開発サーバーを起動
```bash
npm run dev
```

5. ブラウザで http://localhost:5173 にアクセス

## デプロイ

このプロジェクトはGitHub ActionsとGoogle Cloud Runを使用して自動デプロイされるように設定されています。

### デプロイに必要な環境変数

GitHub Secretsに以下の値を設定する必要があります：

- `GCP_PROJECT_ID`: Google CloudプロジェクトのプロジェクトID
- `GCP_SA_KEY`: Google Cloudサービスアカウントのキー（JSON形式）
- `VITE_SUPABASE_URL`: SupabaseのURL
- `VITE_SUPABASE_ANON_KEY`: Supabaseの匿名キー

## 使い方

1. ホームページにアクセス
2. Googleアカウントでログイン
3. 変換したいファイルの種類に応じて、「SJIS→UTF8変換」または「UTF8→SJIS変換」ページに移動
4. ファイルをドラッグ＆ドロップ
5. 変換されたファイルが自動的にダウンロードされます

## ライセンス

MIT
