import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACT_DIR = "C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\39216d63-c2e2-4c09-92a1-29d32f15d299";
const SCREENSHOTS_DIR = path.join(ARTIFACT_DIR, "screenshots");

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Sample roadmap to seed in localStorage
const sampleRoadmap = [
  {
    id: "user_roadmap_demo_1",
    userId: "current_user",
    careerId: "software-engineer",
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    currentStepIndex: 1,
    completedStepIds: ["se_1"],
    notes: ""
  },
  {
    id: "user_roadmap_demo_2",
    userId: "current_user",
    careerId: "doctor-mbbs",
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    currentStepIndex: 0,
    completedStepIds: [],
    notes: ""
  }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("Starting headless Chrome...");
  const chromeArgs = [
    '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"',
    '--headless=new',
    '--remote-debugging-port=9222',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--user-data-dir="C:\\Users\\Dell\\AppData\\Local\\Temp\\chrome_debug_prof_v2"'
  ].join(' ');

  const { exec } = await import('child_process');
  const chromeProc = exec(chromeArgs);

  // Wait for remote debugging endpoint
  let versionData = null;
  for (let i = 0; i < 30; i++) {
    await sleep(400);
    try {
      const res = await fetch("http://127.0.0.1:9222/json/version");
      if (res.ok) {
        versionData = await res.json();
        break;
      }
    } catch (e) {
      // waiting
    }
  }

  if (!versionData) {
    console.error("Failed to connect to Chrome CDP endpoint");
    chromeProc.kill();
    process.exit(1);
  }

  console.log("Chrome running. Creating target page...");
  const newTargetRes = await fetch("http://127.0.0.1:9222/json/new?http://localhost:5173/roadmap", { method: "PUT" });
  const pageTarget = await newTargetRes.json();
  console.log("Target created:", pageTarget.webSocketDebuggerUrl);

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let msgId = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      const resolve = callbacks.get(data.id);
      callbacks.delete(data.id);
      resolve(data);
    }
  };

  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send("Page.enable");
  await send("Runtime.enable");

  // Seed sessionStorage and localStorage on the domain
  console.log("Seeding session auth & roadmaps...");
  await send("Page.navigate", { url: "http://localhost:5173/roadmap" });
  await sleep(1500);

  const seedScript = `
    sessionStorage.setItem('cp_token', 'mock_verified_token');
    localStorage.setItem('futureforge_user_roadmaps_v2_current_user', ${JSON.stringify(JSON.stringify(sampleRoadmap))});
    localStorage.setItem('futureforge_active_roadmap_id_v2', 'user_roadmap_demo_1');
  `;
  await send("Runtime.evaluate", { expression: seedScript });

  // Reload to pick up session and roadmaps
  await send("Page.navigate", { url: "http://localhost:5173/roadmap" });
  await sleep(2500);

  const viewports = [
    { name: "desktop_1440", width: 1440, height: 960, mobile: false, scrollY: 0 },
    { name: "laptop_1024", width: 1024, height: 800, mobile: false, scrollY: 0 },
    { name: "tablet_768", width: 768, height: 1024, mobile: false, scrollY: 100 },
    { name: "mobile_360", width: 360, height: 800, mobile: true, scrollY: 340 }
  ];

  for (const vp of viewports) {
    console.log(`Setting viewport ${vp.name} (${vp.width}x${vp.height})...`);
    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.mobile
    });
    if (vp.name === "mobile_360") {
      await send("Runtime.evaluate", { expression: `document.getElementById('milestone-trail-section')?.scrollIntoView({ behavior: 'instant', block: 'start' });` });
    } else {
      await send("Runtime.evaluate", { expression: `window.scrollTo(0, 0); const m = document.querySelector('main'); if (m) m.scrollTop = 0;` });
    }
    await sleep(1500);

    const shotRes = await send("Page.captureScreenshot", {
      format: "png"
    });

    if (shotRes?.result?.data) {
      const filePath = path.join(SCREENSHOTS_DIR, `roadmap_${vp.name}.png`);
      fs.writeFileSync(filePath, Buffer.from(shotRes.result.data, "base64"));
      console.log(`Saved screenshot: ${filePath}`);
    } else {
      console.error(`Failed to capture ${vp.name}:`, shotRes);
    }
  }

  // Also capture dark mode screenshot
  console.log("Setting dark mode...");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 960,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send("Runtime.evaluate", { expression: `document.documentElement.classList.add('dark'); window.scrollTo(0, 100);` });
  await sleep(1200);
  const shotDark = await send("Page.captureScreenshot", { format: "png" });
  if (shotDark?.result?.data) {
    const darkPath = path.join(SCREENSHOTS_DIR, `roadmap_desktop_1440_dark.png`);
    fs.writeFileSync(darkPath, Buffer.from(shotDark.result.data, "base64"));
    console.log(`Saved dark mode screenshot: ${darkPath}`);
  }

  // Cleanup
  ws.close();
  chromeProc.kill();
  console.log("Finished all screenshot captures successfully!");
  process.exit(0);
}

main().catch(err => {
  console.error("Script failed:", err);
  process.exit(1);
});
