// =========================
// STORAGE SYSTEM
// =========================

function getData() {
  return JSON.parse(localStorage.getItem("glucoseData") || "[]");
}

function saveData(data) {
  localStorage.setItem("glucoseData", JSON.stringify(data));
}

// =========================
// ADD ENTRY
// =========================

function addEntry() {
  const avg = parseFloat(document.getElementById("avg").value);
  if (!avg) return;

  const hba1c = ((avg + 46.7) / 28.7).toFixed(2);

  const data = getData();

  data.push({
    date: new Date().toISOString().split("T")[0],
    avg,
    hba1c: parseFloat(hba1c)
  });

  saveData(data);

  updateUI();
}

// =========================
// STATUS LOGIC (STREFY)
// =========================

function getStatus(hba1c) {
  if (hba1c < 7) return { text: "Stabilnie 🟢", class: "good" };
  if (hba1c < 8.5) return { text: "Uwaga 🟡", class: "warn" };
  return { text: "Alarm 🔴", class: "bad" };
}

// =========================
// UPDATE UI
// =========================

function updateUI() {
  const data = getData();

  if (data.length === 0) return;

  const latest = data[data.length - 1];

  // STATUS
  const status = getStatus(latest.hba1c);
  const box = document.getElementById("statusBox");

  box.className = "status " + status.class;
  box.innerText = `HbA1c: ${latest.hba1c}% → ${status.text}`;

  // TREND
  const trend = document.getElementById("trend");
  trend.innerHTML = data.slice(-7).map(d =>
    `<div>📅 ${d.date} → ${d.hba1c}%</div>`
  ).join("");

  // RANKING (najlepsze dni)
  const ranking = document.getElementById("ranking");

  const sorted = [...data].sort((a,b) => a.hba1c - b.hba1c);

  ranking.innerHTML = sorted.slice(0,5).map(d =>
    `<div>🏅 ${d.date} → ${d.hba1c}%</div>`
  ).join("");
}

// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", updateUI);