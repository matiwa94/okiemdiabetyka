async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// zegarek
function startClock() {
  function update() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const el = document.getElementById("clock");
    if (el) el.textContent = time;
  }
  update();
  setInterval(update, 1000);
}