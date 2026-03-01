// OKX 100x Killer - content script

const BLOCKED_PATTERNS = [
  /\/trade\/swap/i,
  /\/trade\/futures/i,
  /\/trade\/margin/i,
  /\/derivatives/i,
  /swap/i,
  /futures/i
];

const KEYWORDS = [
  "100x",
  "125x",
  "合约",
  "永续",
  "杠杆",
  "Swap",
  "Futures",
  "Derivatives",
  "Margin",
  "Leverage"
];

function shouldBlockUrl(url) {
  return BLOCKED_PATTERNS.some(pattern => pattern.test(url));
}

function blockPage() {
  document.documentElement.innerHTML = `
    <div style="font-family: system-ui; padding: 40px; text-align: center;">
      <h1>🚫 High Leverage Trading Blocked</h1>
      <p>This account is protected from high leverage trading.</p>
      <p>If you truly wish to disable protection, go to extension settings.</p>
    </div>
  `;
}

function hideHighLeverageElements() {
  const elements = document.querySelectorAll("*");
  elements.forEach(el => {
    if (!el.innerText) return;
    const text = el.innerText.trim();
    if (KEYWORDS.some(keyword => text.includes(keyword))) {
      el.style.display = "none";
    }
  });
}

// Run logic
if (shouldBlockUrl(window.location.href)) {
  blockPage();
} else {
  hideHighLeverageElements();
  const observer = new MutationObserver(() => {
    hideHighLeverageElements();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
