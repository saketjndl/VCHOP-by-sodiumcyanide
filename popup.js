const toggleEl = document.getElementById("darkModeToggle");

function setToggleChecked(isEnabled) {
  if (toggleEl) {
    toggleEl.checked = Boolean(isEnabled);
  }
}

function sendDarkModeUpdate(isEnabled) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (!tabs || !tabs.length) {
      return;
    }
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "EXT_DARK_MODE_CHANGED", payload: { enabled: isEnabled } },
      () => chrome.runtime.lastError
    );
  });
}

chrome.storage.sync.get({ darkModeEnabled: false }, data => {
  setToggleChecked(data.darkModeEnabled);
});

toggleEl.addEventListener("change", event => {
  const isEnabled = event.target.checked;
  chrome.storage.sync.set({ darkModeEnabled: isEnabled }, () => {
    sendDarkModeUpdate(isEnabled);
  });
});

