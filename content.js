const DARK_MODE_CLASS = "extension-dark-mode";
const STYLE_TAG_ID = "extension-dark-mode-style";
const CACHE_KEY = "__cgpa_blocker_dark_mode";

function ensureDarkModeStyles() {
  if (document.getElementById(STYLE_TAG_ID)) {
    return;
  }
  const style = document.createElement("style");
  style.id = STYLE_TAG_ID;
  style.textContent = `
    body.${DARK_MODE_CLASS},
    body.${DARK_MODE_CLASS} * {
      background-color: #1a1a1a !important;
      color: #e0e0e0 !important;
      border-color: #3a3a3a !important;
    }
    body.${DARK_MODE_CLASS} a {
      color: #8ecdf9 !important;
    }
  `;
  document.documentElement.appendChild(style);
}

function applyDarkMode(enabled) {
  ensureDarkModeStyles();
  const apply = () => {
    document.body?.classList.toggle(DARK_MODE_CLASS, Boolean(enabled));
    document.documentElement?.style.setProperty(
      "color-scheme",
      enabled ? "dark" : "light"
    );
  };
  if (document.body) {
    apply();
  } else {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  }
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(Boolean(enabled)));
  } catch (error) {
    // ignore storage errors
  }
}

function applyCachedDarkMode() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached !== null) {
      applyDarkMode(JSON.parse(cached));
    }
  } catch {
    // ignore
  }
}

function hideCgpaElements() {
  const widget = document.querySelector(".cgpa-display-widget");
  if (widget) {
    widget.style.display = "none";
  }

  const cards = document.querySelectorAll(".card.border-0.mb-3");
  cards.forEach(card => {
    if (card.dataset.extCgpaCardHidden === "true") {
      return;
    }
    const headerText = card
      .querySelector(".card-header")
      ?.textContent?.replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    const containsEduStatus = card.querySelector("#edu-status");

    if (
      (headerText && headerText.includes("cgpa and credit status")) ||
      containsEduStatus
    ) {
      card.style.display = "none";
      card.dataset.extCgpaCardHidden = "true";
    }
  });
}

const observer = new MutationObserver(() => hideCgpaElements());
observer.observe(document.documentElement || document.body, {
  childList: true,
  subtree: true
});
setTimeout(() => observer.disconnect(), 5000);
hideCgpaElements();

applyCachedDarkMode();

chrome.storage.sync.get({ darkModeEnabled: false }, data => {
  applyDarkMode(data.darkModeEnabled);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "EXT_DARK_MODE_CHANGED") {
    applyDarkMode(message.payload?.enabled);
    sendResponse?.({ status: "ok" });
  }
});

