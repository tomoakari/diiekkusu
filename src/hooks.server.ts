import { createClient } from '@supabase/supabase-js';
import type { Handle } from '@sveltejs/kit';

// 環境変数からSupabaseの設定を取得
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const handle: Handle = async ({ event, resolve }) => {
  // クッキーからセッション情報を取得
  const { cookies } = event;
  const supabaseSessionCookie = cookies.get('sb-auth-token');
  
  // ユーザー情報をイベントのlocalsに設定
  event.locals.user = null;
  
  if (supabaseSessionCookie) {
    try {
      // Supabaseクライアントを作成
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false
        }
      });
      
      // セッションを設定
      const { data: { user } } = await supabase.auth.getUser(supabaseSessionCookie);
      
      if (user) {
        event.locals.user = user;
      }
    } catch (error) {
      console.error('Error getting user from session:', error);
    }
  }
  
  // レスポンスを返す
  return resolve(event);
};
