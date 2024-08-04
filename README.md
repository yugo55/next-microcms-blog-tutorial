# next.js + microCMSでブログ機能チュートリアル

## 備忘録
### 手順
1. microCMSで新しいサービスを作成
2. next.jsプロジェクト作成
3. .envファイルを作成してSERVICE_DOMAINとAPI_KEYに値を挿入
4. microcms-js-sdkをインストール
5. src/libs/client.tsファイルを作成してSDKの初期化コードを記述
6. src/types/blogs.tsファイルを作成してBlog型を定義
7. メインページ、ブログ詳細ページを作成

### ポイント
- getStaticProps、GetStaticPathsなどは現在非推奨。代わりにgetData、generateStaticParamsなどを使用する。
- cheerioはそのままインポートするのは非推奨なので、{ load }をインポート。

## 参考サイト
https://qiita.com/hinako_n/items/e53b02c241b8e35d42cb#%E5%9E%8B%E3%81%AE%E4%BA%8B%E5%89%8D%E6%BA%96%E5%82%99
