// Bulgarian is written in index.html; English is swapped in when picked.
const text = {
  bg: {
    navWork: "Проекти",
    navTeam: "Екип",
    navContact: "Контакт",
    call: "Обадете се",
    title1: "Сайтове и",
    title2: "онлайн магазини.",
    heroSub: "Бързи, красиви и оптимизирани за Google сайтове за вашия бизнес. Готови до [X] седмици.",
    ctaQuote: "Заявете безплатна оферта",
    ctaWork: "Вижте проектите",
    made: "Сайтове, които сме направили:",
    airflow: "Онлайн магазин за слушалки.",
    toh: "Онлайн магазин за обувки и бутонки.",
    trendflow: "Сайт за агенция, която заснема видеа, монтаж и поддържа социални мрежи на бизнеси.",
    factFeatures: "Функции",
    factTime: "Срок",
    airflowFeatures: "[X]",
    airflowTime: "[X] седмици",
    tohFeatures: "[X]",
    tohTime: "[X] седмици",
    trendflowFeatures: "[X]",
    trendflowTime: "[X] седмици",
    visit: "Вижте сайта",
    altAirflow: "Начална страница на airflowpods.com",
    altToh: "Начална страница на tohshoes.com",
    altTrendflow: "Начална страница на trendflow.bg",
    nikolay: "Николай Рангелов",
    mitko: "Митко Тотев",
    roleNikolay: "[Роля]",
    roleMitko: "[Роля]",
    contactHead: "Всеки проект е различен.",
    contactBody: "Цената зависи от това какво ви трябва. Ето от колко започваме:",
    priceSite: "Сайт",
    priceSiteFrom: "от [X] €",
    priceShop: "Онлайн магазин",
    priceShopFrom: "от [X] €",
    promiseConsult: "Безплатна консултация",
    promiseReply: "Отговаряме до [X] часа",
    callNow: "Обадете се",
    studioMail: "Или пишете на",
    copy: "Копирай",
    copied: "Копирано",
    top: "Нагоре",
    docTitle: "NMStudio | Сайтове и онлайн магазини",
    description: "NMStudio сме Николай Рангелов и Митко Тотев. Правим бързи и красиви сайтове и онлайн магазини за бизнеси."
  },
  en: {
    navWork: "Work",
    navTeam: "Team",
    navContact: "Contact",
    call: "Call us",
    title1: "Websites and",
    title2: "online stores.",
    heroSub: "Fast, beautiful, Google-optimised websites for your business. Ready in [X] weeks.",
    ctaQuote: "Get a free quote",
    ctaWork: "See our work",
    made: "Sites we've made:",
    airflow: "Online store for headphones.",
    toh: "Online store for shoes and football boots.",
    trendflow: "Website for an agency that shoots videos, edits them and runs social media for businesses.",
    factFeatures: "Features",
    factTime: "Timeline",
    airflowFeatures: "[X]",
    airflowTime: "[X] weeks",
    tohFeatures: "[X]",
    tohTime: "[X] weeks",
    trendflowFeatures: "[X]",
    trendflowTime: "[X] weeks",
    visit: "Visit site",
    altAirflow: "Homepage of airflowpods.com",
    altToh: "Homepage of tohshoes.com",
    altTrendflow: "Homepage of trendflow.bg",
    nikolay: "Nikolay Rangelov",
    mitko: "Mitko Totev",
    roleNikolay: "[Role]",
    roleMitko: "[Role]",
    contactHead: "Every project is different.",
    contactBody: "The price depends on what you need. Here is where we start:",
    priceSite: "Website",
    priceSiteFrom: "from €[X]",
    priceShop: "Online store",
    priceShopFrom: "from €[X]",
    promiseConsult: "Free consultation",
    promiseReply: "We reply within [X] hours",
    callNow: "Call",
    studioMail: "Or email",
    copy: "Copy",
    copied: "Copied",
    top: "Back to top",
    docTitle: "NMStudio | Websites and online stores",
    description: "NMStudio is Nikolay Rangelov and Mitko Totev. We build fast, beautiful websites and online stores for businesses."
  }
};

const root = document.documentElement;
const title = document.getElementById("title");
const langButton = document.getElementById("lang");
const copyButton = document.getElementById("copy");

// Wrap each word of the heading so it can slide up into view.
function splitTitle() {
  let i = 0;
  title.querySelectorAll(".l").forEach(line => {
    const words = line.textContent.trim().split(/\s+/);
    line.textContent = "";
    words.forEach((word, n) => {
      const outer = document.createElement("span");
      const inner = document.createElement("span");
      outer.className = "w";
      inner.style.setProperty("--i", i++);
      inner.textContent = word;
      outer.appendChild(inner);
      line.appendChild(outer);
      if (n < words.length - 1) line.appendChild(document.createTextNode(" "));
    });
  });
}

function playTitle() {
  title.classList.remove("in");
  void title.offsetWidth;
  title.classList.add("in");
}

function applyLang(lang) {
  const t = text[lang];
  root.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t[el.dataset.i18n]; });
  document.querySelectorAll("[data-i18n-alt]").forEach(el => { el.alt = t[el.dataset.i18nAlt]; });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t[el.dataset.i18nAria]); });
  document.querySelector('meta[name="description"]').content = t.description;
  document.title = t.docTitle;
  langButton.textContent = lang === "bg" ? "EN" : "БГ";
  langButton.setAttribute("aria-label", lang === "bg" ? "EN: Switch to English" : "БГ: Смени на български");
  splitTitle();
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

langButton.addEventListener("click", () => {
  const next = root.lang === "bg" ? "en" : "bg";
  document.body.classList.add("swap");
  setTimeout(() => {
    applyLang(next);
    playTitle();
    document.body.classList.remove("swap");
  }, 180);
});

let saved = "bg";
try { saved = localStorage.getItem("lang") || "bg"; } catch (e) {}
if (saved === "en") applyLang("en"); else splitTitle();
requestAnimationFrame(() => {
  document.body.classList.add("ready");
  playTitle();
});

// Header gets a background once the page is scrolled; the back-to-top button shows near the bottom.
const header = document.getElementById("header");
const toTop = document.getElementById("to-top");
const onScroll = () => {
  header.classList.toggle("scrolled", scrollY > 8);
  toTop.classList.toggle("show", innerHeight + scrollY >= document.documentElement.scrollHeight - 420);
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Fade sections in as they come into view.
const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));

// Project screenshots scroll from top to bottom on hover (or on their own on touch screens).
const shots = [...document.querySelectorAll(".shot")];
function measureShots() {
  shots.forEach(shot => {
    const img = shot.querySelector("img");
    const shift = Math.min(0, shot.clientHeight - img.clientHeight);
    shot.style.setProperty("--shift", shift + "px");
    shot.style.setProperty("--dur", Math.max(4, -shift / 200) + "s");
  });
}
shots.forEach(shot => shot.querySelector("img").addEventListener("load", measureShots));
addEventListener("resize", measureShots);
measureShots();

if (matchMedia("(hover: none)").matches) {
  const autoplay = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle("play", entry.isIntersecting));
  }, { threshold: 0.6 });
  shots.forEach(shot => autoplay.observe(shot));
}

// Phone cards: the glow follows the cursor.
document.querySelectorAll(".phone-card").forEach(card => {
  card.addEventListener("pointermove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  });
});

// Copy email
async function copyEmail() {
  const email = "nmstudio.sites@gmail.com";
  try {
    await navigator.clipboard.writeText(email);
  } catch (e) {
    // older browsers or blocked clipboard permission
    const field = document.createElement("textarea");
    field.value = email;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    if (!ok) throw e;
  }
}

copyButton.addEventListener("click", async () => {
  try {
    await copyEmail();
    copyButton.textContent = text[root.lang].copied;
    copyButton.classList.add("done");
    setTimeout(() => {
      copyButton.textContent = text[root.lang].copy;
      copyButton.classList.remove("done");
    }, 1600);
  } catch (e) {}
});
