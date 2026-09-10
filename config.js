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
  priceMaintenanceFrom: "3,000",

  // ---- 制作実績（あとから差し替え・追加してください） -----------
  // image: 画像パス / category: 表示カテゴリ / url: 公開URL（未公開ならnull）
  // category: 業種・用途（カテゴリーのドロップダウンは、ここに存在する値から自動生成されます）
  // scope: 対応内容（企画・構成／デザイン／コーディングなど）
  // 実績を追加する場合は、この配列に項目を増やすだけでOKです。
  works: [
    {
      title: "MC・司会者向けWebサイト",
      category: "MC・司会",
      scope: ["企画・構成", "デザイン", "コーディング"],
      description:
        "個人事業主として活動するMC・司会者のWebサイトを制作。プロフィール・実績・料金・お問い合わせを整理し、仕事の依頼につながる構成にしました。",
      url: "work-mc.html",
    },
  ],
};
