# OKX 100x Killer

A Chrome extension that adds a deliberate friction layer before enabling **100x leverage on OKX**.

Instead of blocking all derivatives activity, it focuses on one specific action:

- **selecting 100x leverage**

When 100x is clicked, the extension interrupts the flow and requires a full manual declaration before continuing.

---

## Features

- Triggers **only** on 100x leverage selection
- Does **not** block 20x / 30x / 50x / other leverage levels
- Requires exact manual declaration input before allowing 100x
- Unlock remains valid for the **current day only**
- Automatically locks again at **00:00** the next day
- Uses a more rigid **risk-gate** UI style instead of a soft modal

---

## Declaration

The required declaration is:

> 我要做赌狗，我愿意承担失去一切的代价！（只保护一次）

The text must be entered **exactly**.

---

## Why

Because 100x is usually not a plan.
It is an impulse with better branding.

This extension does not try to manage your whole trading life.
It only inserts friction before one particularly destructive click.

---

## How It Works

1. You open OKX leverage selection
2. Normal leverage values are ignored
3. If you click **100x**, the extension blocks the action
4. You must type the declaration exactly
5. Once confirmed, 100x is unlocked for the rest of the day
6. At **00:00**, the lock resets automatically

---

## Installation

1. Download or clone this project
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the `okx-100x-killer-main` folder

If you change the code:

1. Return to `chrome://extensions`
2. Click **Reload** on the extension

---

## Project Structure

```text
okx-100x-killer-main/
├── .gitignore
├── LICENSE
├── README.md
├── content.js
└── manifest.json
```

### Files

- `manifest.json` — Chrome extension manifest
- `content.js` — leverage detection and block UI logic
- `README.md` — project documentation
- `.gitignore` — local junk filters
- `LICENSE` — MIT license

---

## Scope

This extension is intentionally narrow.

It is built for:

- **OKX web pages**
- leverage selection interactions in the trading UI

It is not a general parental-control tool for trading.
It is a behavioral tripwire for one specific threshold.

---

## Limitations

- This is a front-end behavioral tool, not a server-side control
- If OKX changes its DOM structure, detection logic may need maintenance
- It does not prevent losses
- It does not stop manual self-sabotage outside the browser flow
- It only adds friction before 100x access

---

## Roadmap Ideas

Possible future upgrades:

- cooldown timer after repeated failed declaration attempts
- trigger counter / daily log
- tiered warnings for 50x / 75x / 100x
- custom declaration text
- password / lockout mode

---

## License

MIT

---

## Disclaimer

This extension does not save you.
It only gives you one more chance to stop yourself.
