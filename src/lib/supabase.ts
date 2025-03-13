import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

// 環境変数からSupabaseの設定を取得
// 実際のデプロイ時には環境変数を設定する必要があります
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Supabaseクライアントを作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 認証状態を管理するストア
export const user = writable<any>(null);

// 初期化時に現在のセッションを確認
supabase.auth.getSession().then(({ data }) => {
  user.set(data.session?.user || null);
});

// 認証状態の変更を監視
supabase.auth.onAuthStateChange((_, session) => {
  user.set(session?.user || null);
});

// Googleでログイン
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`
    }
  });
  
  if (error) {
    console.error('Error logging in with Google:', error);
    return { error };
  }
  
  return { error: null };
};

// ログアウト
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error);
    return { error };
  }
  
  return { error: null };
};
