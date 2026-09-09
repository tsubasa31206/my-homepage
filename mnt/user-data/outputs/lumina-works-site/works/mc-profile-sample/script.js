// ---- モバイルナビ開閉 ----
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- お問い合わせフォーム ----
// 送信先は FormSubmit（https://formsubmit.co/）を利用しています。
// アカウント登録は不要ですが、フォームの action に設定したメールアドレスへ
// 初回だけ「確認メール」が届くので、そこで一度だけ承認が必要です（無料）。
const form = document.getElementById('contactForm');
const confirmBox = document.getElementById('contactConfirm');
const confirmList = document.getElementById('confirmList');
const confirmTitle = document.getElementById('confirmTitle');
const confirmMessage = document.getElementById('confirmMessage');
const confirmBack = document.getElementById('confirmBack');
const submitBtn = form.querySelector('.btn-submit');

const fieldLabels = {
  name: 'お名前',
  company: '会社名・団体名',
  email: 'メールアドレス',
  phone: '電話番号',
  eventType: 'お問い合わせ種別',
  eventDate: '開催日',
  venue: '開催場所',
  details: 'お問い合わせ・ご相談内容'
};

function buildConfirmList(data) {
  confirmList.innerHTML = '';
  for (const [key, label] of Object.entries(fieldLabels)) {
    const value = (data.get(key) || '').toString().trim();
    if (!value) continue;
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value;
    confirmList.appendChild(dt);
    confirmList.appendChild(dd);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  buildConfirmList(data);

  const actionUrl = form.getAttribute('action') || '';
  const notConfigured = actionUrl.includes('REPLACE_WITH_YOUR_EMAIL');

  if (notConfigured) {
    // 受信用メールアドレスがまだ設定されていない状態。
    // 実際には送信されないため、正直にその旨を伝える。
    confirmTitle.textContent = '送信設定が未完了です';
    confirmMessage.innerHTML =
      'フォームの送信先メールアドレスがまだ設定されていません。<br>' +
      'サイト管理者は index.html 内のフォームの action に書かれている「REPLACE_WITH_YOUR_EMAIL」を、実際に受け取りたいメールアドレスに書き換えてください。<br>' +
      '（入力いただいた内容は送信されていません）';
    form.hidden = true;
    confirmBox.hidden = false;
    confirmBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '送信中…';

  try {
    const res = await fetch(actionUrl, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      confirmTitle.textContent = 'ご入力ありがとうございます';
      confirmMessage.textContent = '以下の内容で送信しました。担当より折り返しご連絡いたします。';
      form.reset();
      form.hidden = true;
      confirmBox.hidden = false;
      confirmBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      throw new Error('送信に失敗しました');
    }
  } catch (err) {
    confirmTitle.textContent = '送信できませんでした';
    confirmMessage.innerHTML =
      '通信エラーのため送信できませんでした。お手数ですが、時間をおして再度お試しいただくか、<br>' +
      '下部のInstagramからご連絡ください。';
    form.hidden = true;
    confirmBox.hidden = false;
    confirmBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'この内容で送信する';
  }
});

confirmBack.addEventListener('click', () => {
  confirmBox.hidden = true;
  form.hidden = false;
});

// ---- 写真のライトボックス表示 ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(img) {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('.zoomable').forEach(img => {
  img.addEventListener('click', () => openLightbox(img));
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

// ---- ボタン・CTA・ナビの長押し対策 ----
// 赤背景と文字は同一要素（spanなどに分割しない）。
// CSS側のuser-select:none / -webkit-touch-calloutに加えて、
// 長押しメニュー(contextmenu)だけ念のため防止する。
// click（リンク遷移・ボタン動作）には一切影響しない。
document.querySelectorAll('.btn, .main-nav a, .brand, .faq-item summary, .lightbox-close')
  .forEach(el => {
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  });

// ---- CTAボタン（<button>）からのスクロール遷移 ----
// これらは<a>ではなく<button>のため、data-scroll-toで
// リンク先セクションまでスムーズスクロールする。
// (html { scroll-behavior: smooth } が効くよう、location.hashで遷移)
document.querySelectorAll('[data-scroll-to]').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetSelector = btn.getAttribute('data-scroll-to');
    const targetEl = document.querySelector(targetSelector);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', targetSelector);
    }
  });
});

// ---- ボタンの押下状態を確実に解除する ----
// iOS SafariはCSSの:active疑似クラス自体が正しく解除されず、
// 指を離した後も暗い状態が残ることがある。これを避けるため、
// CSS側では:activeを使わず、JSで管理する is-pressed クラスのみで
// 押下時の見た目（色が濃くなる・縮む）を制御する。
// touch/mouse両方のイベントを別々に登録するとiOS側の疑似マウス
// イベント（ゴーストイベント）と二重発火することがあるため、
// Pointer Events に一本化し、click発生時にも必ず解除する保険をかける。
document.querySelectorAll('.btn').forEach(btn => {
  const press = () => btn.classList.add('is-pressed');
  const release = () => btn.classList.remove('is-pressed');

  btn.addEventListener('pointerdown', press);
  btn.addEventListener('pointerup', release);
  btn.addEventListener('pointercancel', release);
  btn.addEventListener('pointerleave', release);
  btn.addEventListener('pointerout', release);

  // クリックが成立した時点で必ず解除する最終的な保険
  btn.addEventListener('click', release);

  // Pointer Eventsに対応しない環境向けの保険（タッチのみ）
  btn.addEventListener('touchend', release, { passive: true });
  btn.addEventListener('touchcancel', release, { passive: true });
});

// ページのどこかにタッチ/クリックした際、念のため全ボタンの
// 押下状態をリセットする最終防衛ライン
function releaseAllPressedButtons() {
  document.querySelectorAll('.btn.is-pressed').forEach(btn => {
    btn.classList.remove('is-pressed');
  });
}
document.addEventListener('touchend', releaseAllPressedButtons, { passive: true });
document.addEventListener('pointerup', releaseAllPressedButtons);
