console.log("OKX 100x Killer - hardline mode");

const DECLARATION =
  "我要做赌狗，我愿意承担失去一切的代价！（只保护一次）";
const UNLOCK_DATE_KEY = "okx_unlock_date";
const OVERLAY_ID = "okx-100x-killer-overlay";

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isUnlockedToday() {
  return localStorage.getItem(UNLOCK_DATE_KEY) === getTodayKey();
}

function unlockForToday() {
  localStorage.setItem(UNLOCK_DATE_KEY, getTodayKey());
}

function normalizeText(value) {
  return (value || "").replace(/\s+/g, " ").trim();
}

function removeOverlay() {
  document.getElementById(OVERLAY_ID)?.remove();
}

function createOverlay(onConfirm) {
  removeOverlay();

  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "2147483647",
    background: "rgba(3, 5, 8, 0.88)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  });

  const panel = document.createElement("div");
  Object.assign(panel.style, {
    width: "min(720px, 94vw)",
    background: "linear-gradient(180deg, rgba(12,14,18,0.98), rgba(7,9,12,0.98))",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "4px",
    padding: "0",
    boxShadow: "0 30px 90px rgba(0,0,0,0.55)"
  });

  const topBar = document.createElement("div");
  Object.assign(topBar.style, {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    background: "linear-gradient(90deg, rgba(90,0,0,0.22), rgba(20,20,20,0.05))"
  });

  const topLeft = document.createElement("div");
  topLeft.textContent = "OKX 100x KILLER // RISK GATE";
  Object.assign(topLeft.style, {
    color: "#d9dee7",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.14em"
  });

  const topRight = document.createElement("div");
  topRight.textContent = "ALERT";
  Object.assign(topRight.style, {
    color: "#ff5a5a",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "0.12em"
  });

  topBar.appendChild(topLeft);
  topBar.appendChild(topRight);

  const body = document.createElement("div");
  Object.assign(body.style, {
    padding: "24px"
  });

  const title = document.createElement("div");
  title.textContent = "100X LEVERAGE SELECTION DETECTED";
  Object.assign(title.style, {
    color: "#f4f7fb",
    fontSize: "28px",
    fontWeight: "800",
    letterSpacing: "0.04em",
    lineHeight: "1.2",
    marginBottom: "12px"
  });

  const sub = document.createElement("div");
  sub.textContent = "你正在选择 100x 杠杆。输入完整宣言后才允许继续。解锁仅对今日有效，次日 00:00 自动重锁。";
  Object.assign(sub.style, {
    color: "#aab3c2",
    fontSize: "14px",
    lineHeight: "1.8",
    marginBottom: "18px"
  });

  const quoteBox = document.createElement("div");
  Object.assign(quoteBox.style, {
    border: "1px solid rgba(255,90,90,0.38)",
    background: "rgba(255,90,90,0.06)",
    padding: "16px",
    borderRadius: "2px",
    marginBottom: "18px"
  });

  const quoteLabel = document.createElement("div");
  quoteLabel.textContent = "DECLARATION";
  Object.assign(quoteLabel.style, {
    color: "#ff7a7a",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "0.14em",
    marginBottom: "10px"
  });

  const quoteText = document.createElement("div");
  quoteText.textContent = DECLARATION;
  Object.assign(quoteText.style, {
    color: "#ffe0e0",
    fontSize: "18px",
    lineHeight: "1.7",
    fontWeight: "600"
  });

  quoteBox.appendChild(quoteLabel);
  quoteBox.appendChild(quoteText);

  const input = document.createElement("textarea");
  input.placeholder = "逐字输入完整宣言";
  Object.assign(input.style, {
    width: "100%",
    minHeight: "118px",
    resize: "vertical",
    boxSizing: "border-box",
    padding: "16px",
    borderRadius: "2px",
    border: "1px solid rgba(255,255,255,0.18)",
    outline: "none",
    background: "rgba(8,10,14,0.96)",
    color: "#ffffff",
    fontSize: "15px",
    lineHeight: "1.7",
    marginBottom: "18px"
  });

  const footer = document.createElement("div");
  Object.assign(footer.style, {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap"
  });

  const hint = document.createElement("div");
  hint.textContent = "TRIGGER: CLICK ON 100x  ·  RESET: 00:00 DAILY";
  Object.assign(hint.style, {
    color: "#7f8898",
    fontSize: "12px",
    letterSpacing: "0.08em"
  });

  const actions = document.createElement("div");
  Object.assign(actions.style, {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "取消 / STAND DOWN";
  Object.assign(cancelBtn.style, {
    padding: "12px 18px",
    borderRadius: "2px",
    border: "1px solid rgba(71, 201, 126, 0.9)",
    background: "rgba(71, 201, 126, 0.12)",
    color: "#7CFFAE",
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "0.04em",
    cursor: "pointer"
  });
  cancelBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeOverlay();
  });

  const confirmBtn = document.createElement("button");
  confirmBtn.type = "button";
  confirmBtn.textContent = "确认 / OVERRIDE";
  Object.assign(confirmBtn.style, {
    padding: "12px 18px",
    borderRadius: "2px",
    border: "1px solid rgba(255, 74, 74, 0.95)",
    background: "rgba(255, 74, 74, 0.14)",
    color: "#FF6B6B",
    fontSize: "14px",
    fontWeight: "800",
    letterSpacing: "0.05em",
    cursor: "pointer"
  });
  confirmBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (input.value.trim() === DECLARATION) {
      unlockForToday();
      removeOverlay();
      onConfirm?.();
    } else {
      input.style.border = "1px solid rgba(255, 74, 74, 0.95)";
      input.focus();
      alert("宣言错误。请完整输入，一字不差。");
    }
  });

  input.addEventListener("input", () => {
    input.style.border = "1px solid rgba(255,255,255,0.18)";
  });

  panel.addEventListener("click", (e) => e.stopPropagation());
  overlay.addEventListener("click", () => removeOverlay());

  actions.appendChild(cancelBtn);
  actions.appendChild(confirmBtn);
  footer.appendChild(hint);
  footer.appendChild(actions);

  body.appendChild(title);
  body.appendChild(sub);
  body.appendChild(quoteBox);
  body.appendChild(input);
  body.appendChild(footer);

  panel.appendChild(topBar);
  panel.appendChild(body);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
  input.focus();
}

function isVisible(el) {
  if (!(el instanceof Element)) return false;
  const style = window.getComputedStyle(el);
  return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
}

function getElementText(el) {
  return normalizeText(
    [
      el?.innerText,
      el?.textContent,
      el?.value,
      el?.getAttribute?.("aria-label"),
      el?.getAttribute?.("title")
    ]
      .filter(Boolean)
      .join(" ")
  );
}

function getLeverageFromText(text) {
  const match = normalizeText(text).match(/(^|\s)(\d+(?:\.\d+)?)\s*[x×](\s|$)/i);
  return match ? match[2] : null;
}

function findLeverageTarget(elements) {
  for (const el of elements) {
    if (!isVisible(el)) continue;

    const exact = getLeverageFromText(getElementText(el));
    if (exact) return { el, leverage: exact };

    const directChildren = Array.from(el.children || []).slice(0, 8);
    for (const child of directChildren) {
      if (!(child instanceof Element) || !isVisible(child)) continue;
      const childLev = getLeverageFromText(getElementText(child));
      if (childLev) return { el: child, leverage: childLev };
    }
  }
  return null;
}

function is100xValue(value) {
  return value === "100" || value === "100.0" || value === "100.00";
}

function interceptClick(event) {
  const path = event.composedPath ? event.composedPath() : [];
  const elements = path.filter((node) => node instanceof Element);

  if (elements.some((el) => el.id === OVERLAY_ID || el.closest?.(`#${OVERLAY_ID}`))) {
    return;
  }

  if (isUnlockedToday()) return;

  const target = findLeverageTarget(elements);
  if (!target) return;
  if (!is100xValue(target.leverage)) return;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation?.();

  createOverlay(() => {
    setTimeout(() => target.el.click(), 80);
  });
}

document.addEventListener("click", interceptClick, true);
