import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * クラス名を結合するユーティリティ関数
 * @param inputs クラス名の配列
 * @returns 結合されたクラス名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * ファイルのドロップイベントを処理するユーティリティ関数
 * @param event ドロップイベント
 * @returns ドロップされたファイル
 */
export function handleFileDrop(event: DragEvent): File | null {
  event.preventDefault();
  
  if (!event.dataTransfer) {
    return null;
  }
  
  if (event.dataTransfer.files.length === 0) {
    return null;
  }
  
  return event.dataTransfer.files[0];
}

/**
 * ドラッグオーバーイベントを処理するユーティリティ関数
 * @param event ドラッグオーバーイベント
 */
export function handleDragOver(event: DragEvent): void {
  event.preventDefault();
}
