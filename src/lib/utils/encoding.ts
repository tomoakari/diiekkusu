import iconv from 'iconv-lite';
import { saveAs } from 'file-saver';

/**
 * ファイルの文字コードを検出する
 * @param buffer ファイルのバッファ
 * @returns 検出された文字コード
 */
export function detectEncoding(buffer: ArrayBuffer): string {
  // 簡易的な文字コード判定
  // より正確な判定が必要な場合は、jschardetなどのライブラリを使用することを検討
  const bytes = new Uint8Array(buffer);
  
  // UTF-8 BOMの検出
  if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
    return 'UTF-8';
  }
  
  // Shift_JISの特徴的なバイトパターンを検出
  let isSJIS = false;
  for (let i = 0; i < bytes.length - 1; i++) {
    const b1 = bytes[i];
    const b2 = bytes[i + 1];
    
    // Shift_JISの第一バイトと第二バイトの範囲をチェック
    if ((b1 >= 0x81 && b1 <= 0x9F) || (b1 >= 0xE0 && b1 <= 0xFC)) {
      if ((b2 >= 0x40 && b2 <= 0x7E) || (b2 >= 0x80 && b2 <= 0xFC)) {
        isSJIS = true;
        break;
      }
    }
  }
  
  if (isSJIS) {
    return 'Shift_JIS';
  }
  
  // デフォルトはUTF-8と仮定
  return 'UTF-8';
}

/**
 * SJISからUTF-8に変換する
 * @param buffer SJISエンコードされたファイルのバッファ
 * @returns UTF-8エンコードされたバッファ
 */
export function convertSJISToUTF8(buffer: ArrayBuffer): ArrayBufferLike {
  const sjisBuffer = Buffer.from(buffer);
  const utf8String = iconv.decode(sjisBuffer, 'Shift_JIS');
  return iconv.encode(utf8String, 'UTF-8').buffer;
}

/**
 * UTF-8からSJISに変換する
 * @param buffer UTF-8エンコードされたファイルのバッファ
 * @returns SJISエンコードされたバッファ
 */
export function convertUTF8ToSJIS(buffer: ArrayBuffer): ArrayBufferLike {
  const utf8Buffer = Buffer.from(buffer);
  const utf8String = iconv.decode(utf8Buffer, 'UTF-8');
  return iconv.encode(utf8String, 'Shift_JIS').buffer;
}

/**
 * 変換したファイルをダウンロードする
 * @param buffer ファイルのバッファ
 * @param originalFileName 元のファイル名
 */
export function downloadConvertedFile(buffer: ArrayBufferLike, originalFileName: string): void {
  // ArrayBufferLikeをBlobPartに変換
  const blob = new Blob([new Uint8Array(buffer)]);
  
  // ファイル名を生成（元のファイル名 + _converted + 拡張子）
  const fileNameParts = originalFileName.split('.');
  const extension = fileNameParts.pop() || '';
  const baseName = fileNameParts.join('.');
  const newFileName = `${baseName}_converted.${extension}`;
  
  saveAs(blob, newFileName);
}

/**
 * ファイルをドロップゾーンで処理する
 * @param file ドロップされたファイル
 * @param convertFunction 変換関数
 * @param expectedEncoding 期待される文字コード
 * @returns 処理結果
 */
export async function processFile(
  file: File, 
  convertFunction: (buffer: ArrayBuffer) => ArrayBufferLike,
  expectedEncoding: string
): Promise<{ success: boolean; message: string }> {
  try {
    // ファイルをArrayBufferとして読み込む
    const buffer = await file.arrayBuffer();
    
    // 文字コードを検出
    const detectedEncoding = detectEncoding(buffer);
    
    // 期待される文字コードと一致するか確認
    if (detectedEncoding !== expectedEncoding) {
      return {
        success: false,
        message: `ファイルの文字コードが${expectedEncoding}ではありません。検出された文字コード: ${detectedEncoding}`
      };
    }
    
    // 文字コードを変換
    const convertedBuffer = convertFunction(buffer);
    
    // 変換したファイルをダウンロード
    downloadConvertedFile(convertedBuffer, file.name);
    
    return {
      success: true,
      message: '変換が完了しました。ダウンロードが始まります。'
    };
  } catch (error) {
    console.error('ファイル処理エラー:', error);
    return {
      success: false,
      message: `エラーが発生しました: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}
