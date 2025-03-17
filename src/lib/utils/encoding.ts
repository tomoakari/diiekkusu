import * as Encoding from 'encoding-japanese';
import FileSaver from 'file-saver';

/**
 * ファイルの文字コードを検出する
 * @param buffer ファイルのバッファ
 * @returns 検出された文字コード
 */
export function detectEncoding(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  
  // UTF-8 BOMの検出
  if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
    return 'UTF-8';
  }
  
  // encoding-japaneseを使用して文字コードを検出
  const detected = Encoding.detect(bytes);
  
  if (detected === 'SJIS') {
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
  const bytes = new Uint8Array(buffer);
  
  // SJISからUnicodeに変換
  const unicodeArray = Encoding.convert(bytes, {
    from: 'SJIS',
    to: 'UNICODE',
    type: 'array'
  });
  
  // UnicodeからUTF-8に変換
  const utf8Array = Encoding.convert(unicodeArray, {
    from: 'UNICODE',
    to: 'UTF8',
    type: 'array'
  });
  
  return new Uint8Array(utf8Array).buffer;
}

/**
 * UTF-8からSJISに変換する
 * @param buffer UTF-8エンコードされたファイルのバッファ
 * @returns SJISエンコードされたバッファ
 */
export function convertUTF8ToSJIS(buffer: ArrayBuffer): ArrayBufferLike {
  const bytes = new Uint8Array(buffer);
  
  // UTF-8からUnicodeに変換
  const unicodeArray = Encoding.convert(bytes, {
    from: 'UTF8',
    to: 'UNICODE',
    type: 'array'
  });
  
  // UnicodeからSJISに変換
  const sjisArray = Encoding.convert(unicodeArray, {
    from: 'UNICODE',
    to: 'SJIS',
    type: 'array'
  });
  
  return new Uint8Array(sjisArray).buffer;
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
  
  FileSaver.saveAs(blob, newFileName);
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
