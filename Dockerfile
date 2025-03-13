# ビルドステージ
FROM node:20-alpine AS build

WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm ci

# ソースコードをコピー
COPY . .

# ビルド時に環境変数を設定
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# アプリケーションをビルド
RUN npm run build

# 実行ステージ
FROM node:20-alpine AS runtime

WORKDIR /app

# 本番環境の依存関係のみをインストール
COPY package*.json ./
RUN npm ci --production

# ビルドステージからビルド済みのアプリケーションをコピー
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules

# アプリケーションを実行
CMD ["node", "build"]
