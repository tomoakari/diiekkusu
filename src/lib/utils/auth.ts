import { goto } from '$app/navigation';
import { user } from '$lib/supabase';
import { get } from 'svelte/store';

/**
 * ユーザーがログインしているかどうかを確認する
 * @returns ログイン状態
 */
export function isAuthenticated(): boolean {
  return !!get(user);
}

/**
 * 認証が必要なページへのアクセスを制御する
 * ログインしていない場合はログインページにリダイレクトする
 * @returns リダイレクトが必要かどうか
 */
export function requireAuth(): boolean {
  if (!isAuthenticated()) {
    goto('/login');
    return false;
  }
  return true;
}

/**
 * ユーザー情報を取得する
 * @returns ユーザー情報
 */
export function getUserInfo() {
  return get(user);
}
