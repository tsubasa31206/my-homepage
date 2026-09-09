/**
 * ============================================================
 *  LUMINA WORKS サイト設定ファイル
 * ------------------------------------------------------------
 *  本番公開の際は、このファイルの値だけを書き換えてください。
 *  HTML / CSS を直接編集する必要はありません。
 * ============================================================
 */

const SITE_CONFIG = {
  // ---- 会社基本情報 -----------------------------------------
  companyName: "株式会社LUMINA WORKS",
  companyNameEn: "LUMINA WORKS Co., Ltd.",
  representativeTitle: "代表取締役",
  representativeName: "山田 翼",
  representativeMessage:
    "Web制作を通じて、中小企業・店舗・個人事業主の魅力を伝えることを目的に活動しています。事業内容やお客様の想いをきちんとお伺いしたうえで、実際の仕事につながるホームページをかたちにしていきたいと考えています。",
  representativePhoto: "assets/profile.jpg", // ← 顔写真に差し替え

  postalCode: "〒000-0000",
  address: "〇〇県〇〇市〇〇 0-0-0",
  addressBuilding: "〇〇ビル 0F",
  tel: "000-0000-0000",
  email: "info@example.com",
  businessHours: "平日 10:00〜18:00（土日祝を除く）",
  establishedNote: "現在法人化準備中",

  // ---- SNS ----------------------------------------------------
  sns: {
    instagram: "https://instagram.com/example",
    tiktok: "https://tiktok.com/@example",
    x: "https://x.com/example",
    line: "https://lin.ee/example",
  },

  // ---- 料金 -----------------------------------------------------
  priceHomepageFrom: "50,000",
  priceMaintenanceFrom: "5,000",

  // ---- 制作実績（あとから差し替え・追加してください） -----------
  // image: 画像パス / category: 表示カテゴリ / url: 公開URL（未公開ならnull）
  works: [
    {
      title: "MC・司会者向けプロフィールサイト",
      category: "個人事業主サイト",
      description:
        "企業イベントから結婚式まで幅広く活動するMC・司会者様のための、依頼につながるプロフィールサイトを制作しました。実績・人柄・料金の目安・よくある疑問を整理し、お問い合わせへの導線を設計しています。",
      image: "works-mc-profile-thumb.png",
      url: "work-mc-profile.html",
      status: "制作実績",
      note: "※掲載内容・画像は個人情報保護のため、サンプル用に変更しています。",
    },
    {
      title: "制作実績募集中",
      category: "企業サイト",
      description:
        "企業様のホームページ制作事例をこちらに掲載予定です。掲載許可をいただいたものから順次公開してまいります。",
      image: null,
      url: null,
      status: "準備中",
    },
    {
      title: "制作実績募集中",
      category: "店舗サイト",
      description:
        "店舗様のホームページ制作事例をこちらに掲載予定です。",
      image: null,
      url: null,
      status: "準備中",
    },
    {
      title: "制作実績募集中",
      category: "イベント・サービスサイト",
      description:
        "イベント・サービスサイトの制作事例をこちらに掲載予定です。",
      image: null,
      url: null,
      status: "準備中",
    },
  ],
};
