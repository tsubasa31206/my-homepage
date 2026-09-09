# LUMINA WORKS コーポレートサイト（GitHub Pages対応版）

## このバージョンについて

以前のバージョンは `css/` `js/` `assets/` `works/` のようにフォルダ分けされていましたが、
GitHub Pagesへのアップロード時にフォルダ構造が失われ、`style.css` 等が `404`（存在しない）
状態になり、CSSが適用されない不具合が発生していました。

このバージョンは、**すべてのファイルを1つの階層（フォルダなし）に置く構成** に直してあります。
GitHubの「Add file → Upload files」でまとめてドラッグ＆ドロップしても、
フォルダ構造が失われる心配がありません。

## ファイル一覧
```
index.html                    … TOPページ
privacy.html                  … プライバシーポリシー
style.css                     … サイト全体のデザイン
script.js                     … サイトの挙動
config.js                     … ★会社情報・料金・SNS・制作実績（編集はここだけでOK）
favicon.svg                   … ファビコン
works-mc-profile-thumb.png    … 制作事例カードのサムネイル画像

work-mc-profile.html          … 制作事例詳細ページ（MC・司会者向けサイト事例）
work-mc-profile.css           … 上記ページのデザイン
work-mc-profile.js            … 上記ページの挙動
work-mc-profile-pc.png        … 上記ページ：PCプレビュー画像
work-mc-profile-mobile.png    … 上記ページ：スマホプレビュー画像
work-mc-profile-avatar.svg    … 上記ページ：未使用の予備アイコン（削除しても問題なし）
```

## GitHub Pagesへのアップロード方法（重要）

1. リポジトリ `tsubasa31206/my-homepage` を開く
2. 既存の `index.html` `privacy.html` `style.css` `script.js` `config.js` は
   このフォルダの同名ファイルで上書きする（GitHubの画面上で直接編集するか、
   一度削除してから下記の新しいファイル一式をアップロードする）
3. このフォルダの**すべてのファイルを一度に選択して**
   「Add file → Upload files」にドラッグ＆ドロップする
   （1つずつではなく、まとめて選択するのがポイントです）
4. 画面下部の「Commit changes」を押して保存する
5. 数十秒〜数分待ってから `https://tsubasa31206.github.io/my-homepage/` を
   スーパーリロード（Windows: Ctrl+Shift+R／Mac: Cmd+Shift+R）で再読み込みする

※ 今後ファイルを追加する場合も、サブフォルダを作らず、このファイルと同じ階層に
　置くようにすると、同じ問題を防げます。

## 本番公開前に差し替える項目（`config.js`）

| 項目 | 現在の仮の値 |
|---|---|
| 会社名 | 株式会社LUMINA WORKS |
| 代表者名・役職 | 代表取締役 山田 翼 |
| 代表者メッセージ・写真 | `representativePhoto` に画像パスを指定 |
| 所在地・郵便番号 | 〒000-0000 〇〇県〇〇市〇〇 |
| 電話番号 | 000-0000-0000 |
| メールアドレス | info@example.com |
| 営業時間 | 平日 10:00〜18:00 |
| SNSリンク（Instagram / TikTok / X / LINE） | すべて仮リンク |
| ホームページ制作の料金下限 | 150,000円〜 |
| 保守・管理の料金下限 | 月額5,000円〜 |
| 制作実績（`works` 配列） | MC・司会者向けサイトの匿名化事例1件を登録済み、他はプレースホルダー |

## そのほか公開前に必要な作業

1. 代表者プロフィール写真、OGP画像を用意し、`config.js` の `representativePhoto` および
   `index.html` の `og:image` を差し替える。
2. `index.html` / `privacy.html` 内の `https://example.com/` を実際のドメイン
   （`https://tsubasa31206.github.io/my-homepage/`）に置き換える。
3. お問い合わせフォーム（`script.js` の送信処理部分）を、実際の送信先
   （フォーム送信サービスや自社サーバーのAPIなど）に接続する。現状はデモとして
   完了画面を表示するのみで、実際の送信は行われません。
4. `privacy.html` の内容は一般的な構成の仮文面です。公開前に弁護士等の
   専門家による確認を推奨します。
5. 法人登記が完了した際は、会社名・所在地・代表者名を正式なものに更新する。
