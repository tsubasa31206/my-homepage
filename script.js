(() => {
  "use strict";

  const cfg = window.SITE_CONFIG || {};
  const $ = (id) => document.getElementById(id);
  const setText = (id, text) => {
    const el = $(id);
    if (el && text != null) el.textContent = text;
  };

  /* ---------------------------------------------------------
     会社情報の差し込み
  --------------------------------------------------------- */
  try {
    setText("aboutCompanyName", cfg.companyName);
    setText("aboutRep", `${cfg.representativeTitle || ""} ${cfg.representativeName || ""}`.trim());
    setText("aboutAddress", `${cfg.postalCode || ""} ${cfg.address || ""} ${cfg.addressBuilding || ""}`.trim());
    setText("aboutTel", cfg.tel);
    setText("aboutEmail", cfg.email);
    setText("aboutHours", cfg.businessHours);

    setText("profileRole", cfg.representativeTitle);
    setText("profileName", cfg.representativeName);
    setText("profileMessage", cfg.representativeMessage);

    const priceHomeEl = $("priceHomepage");
    if (priceHomeEl && cfg.priceHomepageFrom) priceHomeEl.innerHTML = `${cfg.priceHomepageFrom}円<small>〜</small>`;
    const priceMaintEl = $("priceMaintenance");
    if (priceMaintEl && cfg.priceMaintenanceFrom) priceMaintEl.innerHTML = `月額${cfg.priceMaintenanceFrom}円<small>〜</small>`;

    setText("contactTel", cfg.tel);
    setText("contactHours", cfg.businessHours);
    setText("contactEmail", cfg.email);

    setText("footerCompanyName", cfg.companyName);
    setText("footerTel", cfg.tel ? `TEL：${cfg.tel}` : null);
    setText("footerEmail", cfg.email ? `MAIL：${cfg.email}` : null);
    setText("footerCopy", `© ${new Date().getFullYear()} ${cfg.companyName || ""}`.trim());

    const footerInfo = $("footerCompanyInfo");
    if (footerInfo) {
      footerInfo.innerHTML = `
        <li>${cfg.representativeTitle || ""} ${cfg.representativeName || ""}</li>
        <li>${cfg.postalCode || ""} ${cfg.address || ""}</li>
        <li>${cfg.businessHours || ""}</li>
      `;
    }

    const footerSns = $("footerSns");
    if (footerSns && cfg.sns) {
      const snsLabels = { instagram: "Instagram", tiktok: "TikTok", x: "X", line: "LINE" };
      Object.entries(cfg.sns).forEach(([key, url]) => {
        if (!url) return;
        const a = document.createElement("a");
        a.href = url;
        a.textContent = snsLabels[key] || key;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        footerSns.appendChild(a);
      });
    }
  } catch (err) {
    console.error("[LUMINA WORKS] 会社情報の差し込みでエラー:", err);
  }

  /* ---------------------------------------------------------
     ヘッダー：スクロールで背景を出す
  --------------------------------------------------------- */
  try {
    const header = $("siteHeader");
    if (header) {
      const onScroll = () => {
        if (window.scrollY > 8) header.classList.add("is-scrolled");
        else header.classList.remove("is-scrolled");
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  } catch (err) {
    console.error("[LUMINA WORKS] ヘッダー処理でエラー:", err);
  }

  /* ---------------------------------------------------------
     モバイルナビ開閉
  --------------------------------------------------------- */
  try {
    const navToggle = $("navToggle");
    const navMobile = $("navMobile");
    if (navToggle && navMobile) {
      const closeNav = () => {
        navMobile.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      };
      navToggle.addEventListener("click", () => {
        const open = navMobile.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(open));
      });
      navMobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
    }
  } catch (err) {
    console.error("[LUMINA WORKS] モバイルナビ処理でエラー:", err);
  }

  /* ---------------------------------------------------------
     制作事例：描画とフィルター
  --------------------------------------------------------- */
  try {
    const worksGrid = $("worksGrid");
    const worksFilter = $("worksFilter");
    if (worksGrid && worksFilter && Array.isArray(cfg.works)) {
      const renderWorks = (filter) => {
        worksGrid.innerHTML = "";
        cfg.works
          .filter((w) => filter === "all" || w.category === filter)
          .forEach((w) => {
            const card = document.createElement("article");
            card.className = "work-card";
            const isExternalLink = w.url && /^https?:\/\//.test(w.url);
            const linkTarget = isExternalLink ? ' target="_blank" rel="noopener noreferrer"' : "";
            const linkOpen = w.url ? `<a href="${w.url}"${linkTarget}>` : "";
            const linkClose = w.url ? "</a>" : "";
            const thumbInner = w.image
              ? `<img src="${w.image}" alt="${w.title}のプレビュー" loading="lazy">`
              : `${w.category}<br>（画像差し替え予定）`;
            const noteHtml = w.note ? `<p class="work-note">${w.note}</p>` : "";
            card.innerHTML = `
              ${linkOpen}
              <div class="work-thumb${w.image ? " has-image" : ""}">${thumbInner}</div>
              <div class="work-body">
                <span class="work-cat">${w.category}</span>
                <h3>${w.title}</h3>
                <p>${w.description}</p>
                ${noteHtml}
                <span class="work-status">${w.status}</span>
              </div>
              ${linkClose}
            `;
            worksGrid.appendChild(card);
          });
      };
      renderWorks("all");

      worksFilter.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-filter]");
        if (!btn) return;
        worksFilter.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        renderWorks(btn.dataset.filter);
      });
    }
  } catch (err) {
    console.error("[LUMINA WORKS] 制作事例の描画でエラー:", err);
  }

  /* ---------------------------------------------------------
     FAQ アコーディオン
  --------------------------------------------------------- */
  try {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const q = item.querySelector(".faq-q");
      const a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("is-open");
            const openQ = openItem.querySelector(".faq-q");
            const openA = openItem.querySelector(".faq-a");
            if (openQ) openQ.setAttribute("aria-expanded", "false");
            if (openA) openA.style.maxHeight = null;
          }
        });
        if (isOpen) {
          item.classList.remove("is-open");
          q.setAttribute("aria-expanded", "false");
          a.style.maxHeight = null;
        } else {
          item.classList.add("is-open");
          q.setAttribute("aria-expanded", "true");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
  } catch (err) {
    console.error("[LUMINA WORKS] FAQ処理でエラー:", err);
  }

  /* ---------------------------------------------------------
     お問い合わせフォーム：入力 → 確認 → 完了
  --------------------------------------------------------- */
  try {
    const form = $("contactForm");
    if (form) {
      const steps = form.querySelectorAll(".form-step");
      const showStep = (n) => {
        steps.forEach((s) => s.classList.toggle("is-active", Number(s.dataset.step) === n));
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      const fieldLabels = {
        name: "お名前",
        company: "会社名",
        email: "メールアドレス",
        tel: "電話番号",
        type: "お問い合わせ種別",
        purpose: "ホームページの目的",
        deadline: "希望納期",
        url: "現在のホームページURL",
        message: "お問い合わせ内容",
      };

      const toConfirm = $("toConfirm");
      if (toConfirm) {
        toConfirm.addEventListener("click", () => {
          if (!form.reportValidity()) return;
          const data = new FormData(form);
          const table = $("confirmTable");
          if (table) {
            table.innerHTML = "";
            Object.entries(fieldLabels).forEach(([key, label]) => {
              const value = (data.get(key) || "").toString().trim() || "（未入力）";
              const tr = document.createElement("tr");
              tr.innerHTML = `<th>${label}</th><td>${value.replace(/</g, "&lt;")}</td>`;
              table.appendChild(tr);
            });
          }
          showStep(2);
        });
      }

      const backToForm = $("backToForm");
      if (backToForm) backToForm.addEventListener("click", () => showStep(1));

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        // ------------------------------------------------------------------
        // 本番接続メモ：
        // ここで実際の送信処理（フォーム送信サービスや自社サーバーAPIなど）
        // に置き換えてください。現在はデモとして完了画面を表示するのみです。
        // ------------------------------------------------------------------
        showStep(3);
      });
    }
  } catch (err) {
    console.error("[LUMINA WORKS] お問い合わせフォーム処理でエラー:", err);
  }

  /* ---------------------------------------------------------
     スクロールリビール（控えめな一括フェード／JSが動く場合のみ有効）
  --------------------------------------------------------- */
  try {
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => io.observe(el));
      // 安全対策：何らかの理由でobserverが発火しない要素が残っても、
      // 一定時間後には必ず表示されるようにする。
      setTimeout(() => {
        revealEls.forEach((el) => el.classList.add("is-visible"));
      }, 2000);
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }
  } catch (err) {
    console.error("[LUMINA WORKS] 表示アニメーション処理でエラー:", err);
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }
})();
