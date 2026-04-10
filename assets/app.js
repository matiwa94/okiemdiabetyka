// =========================
// LOAD HTML COMPONENTS
// =========================

async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error("Błąd ładowania komponentu:", err);
  }
}

// =========================
// CLOCK (DATA + GODZINA)
// =========================

function startClock() {

  function update() {
    const now = new Date();

    const date = now.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });

    const time = now.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const el = document.getElementById("clock");

    if (el) {
      el.textContent = `${date} ${time}`;
    }
  }

  update();
  setInterval(update, 1000);
}

// =========================
// INIT APP (NAJWAŻNIEJSZE)
// =========================

document.addEventListener("DOMContentLoaded", () => {

  // zegar
  startClock();

  // jeśli używasz komponentów:
  // loadComponent("header", "header.html");
  // loadComponent("footer", "footer.html");

});