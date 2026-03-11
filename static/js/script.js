(() => {
  const state = {
    lang: (window.__APP__?.defaultLang || "pt").toLowerCase(),
    dict: null,
    typingTimer: null,
    typingIndex: 0,
    typingText: "",
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function setHtmlLang(lang) {
    document.documentElement.dataset.lang = lang;
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  }

  function deepGet(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] != null ? acc[key] : null), obj);
  }

  async function loadDict(lang) {
    const res = await fetch(`/api/i18n/${encodeURIComponent(lang)}.json`, { cache: "no-store" });
    if (!res.ok) throw new Error(`i18n load failed: ${res.status}`);
    return res.json();
  }

  function applyI18n(dict) {
    state.dict = dict;

    const metaTitle = deepGet(dict, "meta.title");
    if (metaTitle) document.title = metaTitle;

    const metaDesc = deepGet(dict, "meta.description");
    if (metaDesc) {
      let el = document.querySelector('meta[name="description"]');
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }
      el.setAttribute("content", metaDesc);
    }

    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = deepGet(dict, key);
      if (typeof value === "string") el.textContent = value;
    });

    $("#langLabel").textContent = state.lang.toUpperCase();
    setHtmlLang(state.lang);
    initTypingSnippet();
  }

  function initReveal() {
    const els = $$(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
  }

  function initSmoothScroll() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    });
  }

  function showToast(msg, kind) {
    const toast = $("#toast");
    if (!toast) return;
    toast.classList.remove("is-ok", "is-error");
    if (kind === "ok") toast.classList.add("is-ok");
    if (kind === "error") toast.classList.add("is-error");
    toast.textContent = msg || "";
  }

  function validateField(field) {
    const input = field.querySelector("input, textarea");
    const error = field.querySelector(".field__error");
    if (!input || !error) return true;

    let msg = "";
    if (input.validity.valueMissing) msg = state.lang === "en" ? "Required." : "Obrigatório.";
    else if (input.validity.typeMismatch) msg = state.lang === "en" ? "Invalid format." : "Formato inválido.";
    else if (input.validity.tooShort) msg = state.lang === "en" ? "Too short." : "Muito curto.";

    error.textContent = msg;
    return !msg;
  }

  function initForm() {
    const form = $("#contactForm");
    if (!form) return;

    $$("label.field", form).forEach((field) => {
      const input = field.querySelector("input, textarea");
      if (!input) return;
      input.addEventListener("input", () => validateField(field));
      input.addEventListener("blur", () => validateField(field));
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      showToast("");

      const fields = $$("label.field", form);
      const ok = fields.map(validateField).every(Boolean);
      if (!ok) {
        showToast(deepGet(state.dict, "contact.error") || "Erro.", "error");
        return;
      }

      const btn = $("#sendBtn");
      const btnText = btn?.querySelector("[data-i18n='contact.send']") || btn?.querySelector(".btn__text");
      const original = btnText?.textContent || "";
      if (btnText) btnText.textContent = deepGet(state.dict, "contact.sending") || "Enviando…";
      if (btn) btn.disabled = true;

      try {
        // EmailJS config (substitua pelos seus dados)
        const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
        const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
        const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

        if (!window.emailjs) throw new Error("EmailJS not loaded");
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

        const data = Object.fromEntries(new FormData(form).entries());
        const isPlaceholder =
          [EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID].some((x) => String(x).includes("YOUR_"));

        if (isPlaceholder) {
          await new Promise((r) => setTimeout(r, 650));
          throw new Error("EmailJS placeholders not set");
        }

        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
        form.reset();
        showToast(deepGet(state.dict, "contact.sent") || "OK!", "ok");
      } catch (err) {
        showToast(deepGet(state.dict, "contact.error") || "Erro.", "error");
      } finally {
        if (btnText) btnText.textContent = original;
        if (btn) btn.disabled = false;
      }
    });
  }

  function initLangToggle() {
    const btn = $("#langToggle");
    if (!btn) return;

    btn.addEventListener("click", async () => {
      const next = state.lang === "pt" ? "en" : "pt";
      try {
        const dict = await loadDict(next);
        state.lang = next;
        applyI18n(dict);
      } catch (e) {
        // fallback: keep current language
      }
    });
  }

  function typingSource(lang) {
    if (lang === "en") {
      return [
        "from dataclasses import dataclass",
        "",
        "@dataclass",
        "class Profile:",
        '    name: str = "LUNILUXX"',
        '    degree: str = "ADS (Anhanguera)"',
        "    focus: tuple = ('Python', 'Data', 'Backend')",
        "",
        "def build(value: Profile) -> dict:",
        "    return {",
        "        'name': value.name,",
        "        'degree': value.degree,",
        "        'focus': list(value.focus),",
        "    }",
        "",
        "print(build(Profile()))",
      ].join("\n");
    }

    return [
      "from dataclasses import dataclass",
      "",
      "@dataclass",
      "class Perfil:",
      '    nome: str = "LUNILUXX"',
      '    curso: str = "ADS (Anhanguera)"',
      "    foco: tuple = ('Python', 'Dados', 'Backend')",
      "",
      "def construir(valor: Perfil) -> dict:",
      "    return {",
      "        'nome': valor.nome,",
      "        'curso': valor.curso,",
      "        'foco': list(valor.foco),",
      "    }",
      "",
      "print(construir(Perfil()))",
    ].join("\n");
  }

  function initTypingSnippet() {
    const target = $("#typingTarget");
    if (!target) return;
    if (state.typingTimer) window.clearInterval(state.typingTimer);

    state.typingText = typingSource(state.lang);
    state.typingIndex = 0;
    target.textContent = "";

    const speed = 14; // ms per char
    state.typingTimer = window.setInterval(() => {
      const next = state.typingText.slice(0, state.typingIndex + 1);
      target.textContent = next;
      state.typingIndex += 1;
      if (state.typingIndex >= state.typingText.length) window.clearInterval(state.typingTimer);
    }, speed);
  }

  async function boot() {
    initReveal();
    initSmoothScroll();
    initForm();
    initLangToggle();

    try {
      const dict = await loadDict(state.lang);
      applyI18n(dict);
    } catch (e) {
      // fallback minimal
      setHtmlLang(state.lang);
      initTypingSnippet();
    }
  }

  boot();
})();

