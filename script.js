(() => {
  "use strict";

  const cfg = window.SITE_CONFIG;

  /* ---------------------------------------------------------
     会社情報の差し込み
  --------------------------------------------------------- */
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("aboutCompanyName", cfg.companyName);
  setText("aboutRep", `${cfg.representativeTitle} ${cfg.representativeName}`);
  setText("aboutAddress", `${cfg.postalCode} ${cfg.address} ${cfg.addressBuilding}`);
  setText("aboutTel", cfg.tel);
  setText("aboutEmail", cfg.email);
  setText("aboutHours", cfg.businessHours);

  setText("profileRole", cfg.representativeTitle);
  setText("profileName", cfg.representativeName);
  setText("profileMessage", cfg.representativeMessage);

  setText("priceHomepage", "");
  const priceHomeEl = document.getElementById("priceHomepage");
  if (priceHomeEl) priceHomeEl.innerHTML = `${cfg.priceHomepageFrom}円<small>〜</small>`;
  const priceMaintEl = document.getElementById("priceMaintenance");
  if (priceMaintEl) priceMaintEl.innerHTML = `月額${cfg.priceMaintenanceFrom}円<small>〜</small>`;

  setText("contactTel", cfg.tel);
  setText("contactHours", cfg.businessHours);
  setText("contactEmail", cfg.email);

  setText("footerCompanyName", cfg.companyName);
  setText("footerTel", `TEL：${cfg.tel}`);
  setText("footerEmail", `MAIL：${cfg.email}`);
  setText("footerCopy", `© ${new Date().getFullYear()} ${cfg.companyName}`);

  const footerInfo = document.getElementById("footerCompanyInfo");
  if (footerInfo) {
    footerInfo.innerHTML = `
      <li>${cfg.representativeTitle} ${cfg.representativeName}</li>
      <li>${cfg.postalCode} ${cfg.address}</li>
      <li>${cfg.businessHours}</li>
    `;
  }

  const footerSns = document.getElementById("footerSns");
  if (footerSns) {
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

  /* ---------------------------------------------------------
     ヘッダー：スクロールで背景を出す
  --------------------------------------------------------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------------------------------------------------
     モバイルナビ開閉
  --------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navMobile = document.getElementById("navMobile");
  const closeNav = () => {
    navMobile.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };
  navToggle.addEventListener("click", () => {
    const open = navMobile.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navMobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));

  /* ---------------------------------------------------------
     制作事例：描画とフィルター
  --------------------------------------------------------- */
  const worksGrid = document.getElementById("worksGrid");
  const worksFilter = document.getElementById("worksFilter");

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

  /* ---------------------------------------------------------
     FAQ アコーディオン
  --------------------------------------------------------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("is-open");
          openItem.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          openItem.querySelector(".faq-a").style.maxHeight = null;
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

  /* ---------------------------------------------------------
     お問い合わせフォーム：入力 → 確認 → 完了
  --------------------------------------------------------- */
  const form = document.getElementById("contactForm");
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

  document.getElementById("toConfirm").addEventListener("click", () => {
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const table = document.getElementById("confirmTable");
    table.innerHTML = "";
    Object.entries(fieldLabels).forEach(([key, label]) => {
      const value = (data.get(key) || "").toString().trim() || "（未入力）";
      const tr = document.createElement("tr");
      tr.innerHTML = `<th>${label}</th><td>${value.replace(/</g, "&lt;")}</td>`;
      table.appendChild(tr);
    });
    showStep(2);
  });

  document.getElementById("backToForm").addEventListener("click", () => showStep(1));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // ------------------------------------------------------------------
    // 本番接続メモ：
    // ここで実際の送信処理（フォーム送信サービスや自社サーバーAPIなど）
    // に置き換えてください。現在はデモとして完了画面を表示するのみです。
    // ------------------------------------------------------------------
    showStep(3);
  });

  /* ---------------------------------------------------------
     スクロールリビール（控えめな一括フェード）
  --------------------------------------------------------- */
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
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
