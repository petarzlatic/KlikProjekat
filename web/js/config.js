/* =========================================================
   USKLIK — Zajedničke funkcije za sve stranice
   (header/footer render, zaštita stranica po ulozi, pomoćne
   funkcije za prikaz zvezdica, inicijala, toast poruka...)
   ========================================================= */

function kuEscape(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

function kuInitials(ime) {
  return (ime || "?")
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function kuStarsHtml(avg, size) {
  const full = Math.round(avg);
  let html = '<span class="stars">';
  for (let i = 1; i <= 5; i++) {
    html += i <= full ? "★" : '<span class="empty">★</span>';
  }
  html += "</span>";
  return html;
}

function kuFormatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("sr-RS", { day: "numeric", month: "short", year: "numeric" });
}

function kuToast(msg) {
  let el = document.getElementById("ku-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "ku-toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(window.__kuToastTimer);
  window.__kuToastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

function kuQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* ---------------------- Header / Footer ---------------------- */
function kuRenderHeader(activeNav) {
  const mount = document.getElementById("ku-header");
  if (!mount) return;
  const user = KU.store.currentUser();

  let rightSide = "";
  if (user) {
    const panelHref = user.role === "klijent" ? "panel-klijent.html" : "panel-izvodjac.html";
    rightSide = `
      <div class="nav-user">
        <span class="badge-role">${user.role === "klijent" ? "Klijent" : "Izvođač"}</span>
        <a class="navlink" href="${panelHref}">${kuEscape(user.ime.split(" ")[0])}</a>
        <button class="btn btn-ghost btn-sm" id="ku-logout-btn" type="button">Odjava</button>
      </div>`;
  } else {
    rightSide = `
      <div class="nav-user">
        <a class="btn btn-ghost btn-sm" href="prijava.html">Prijava</a>
        <a class="btn btn-primary btn-sm" href="registracija.html">Registracija</a>
      </div>`;
  }

  mount.innerHTML = `
    <div class="inner">
      <a class="logo" href="index.html"><img src="img/usklik-logo.png" alt="Usklik" /><span class="dot">.rs</span></a>
      <nav class="nav-links">
        <a class="navlink" href="kako-radi.html">Kako radi</a>
        <a class="navlink" href="pretraga.html">Pronađi izvođača</a>
        ${user && user.role === "izvodjac" ? '<a class="navlink" href="panel-izvodjac.html">Dostupni zahtevi</a>' : ""}
        ${user && user.role === "klijent" ? '<a class="navlink" href="novi-zahtev.html">Objavi zahtev</a>' : ""}
      </nav>
      ${rightSide}
    </div>`;

  const logoutBtn = document.getElementById("ku-logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      KU.store.logout();
      window.location.href = "index.html";
    });
  }
}

function kuRenderFooter() {
  const mount = document.getElementById("ku-footer");
  if (!mount) return;
  mount.innerHTML = `
    <div class="container foot-grid">
      <div>
        <div class="logo logo-footer" style="color:#fff;"><img src="img/usklik-logo.png" alt="Usklik" /><span class="dot">.rs</span></div>
        <p class="small" style="color:#B9C6EA; max-width:320px; margin-top:8px;">
          Digitalna platforma koja povezuje zanatlije i servise za čišćenje sa korisnicima.
          Test tržište: Niš, Srbija.
        </p>
      </div>
      <div>
        <div class="small" style="color:#fff; font-weight:700; margin-bottom:8px;">Platforma</div>
        <div class="flex-col small" style="gap:6px;">
          <a href="kako-radi.html">Kako radi</a>
          <a href="pretraga.html">Pronađi izvođača</a>
          <a href="registracija.html">Registruj se</a>
        </div>
      </div>
      <div>
        <div class="small" style="color:#fff; font-weight:700; margin-bottom:8px;">O projektu</div>
        <div class="flex-col small" style="gap:6px;">
          <span>MVP verzija — u razvoju</span>
          <span>© ${new Date().getFullYear()} Usklik.rs</span>
        </div>
      </div>
    </div>`;
}

function kuRenderDemoBanner() {
  const mount = document.getElementById("ku-demo-banner");
  if (!mount) return;
  // Napomena (Dan 2/3.9.): sajt sad radi preko prave, zajedničke baze
  // (Supabase) — nalozi i zahtevi koje ovde napraviš su stvarni i vide ih
  // svi koji koriste sajt, zato više nema dugmeta za "reset demo podataka"
  // (to bi obrisalo tuđe stvarne podatke, ne samo tvoje).
  mount.innerHTML = `Rana test verzija — u razvoju. Podaci uneti ovde su stvarni i čuvaju se u zajedničkoj bazi.`;
}

/* Poziva se na vrhu stranica koje zahtevaju prijavu.
   role = "klijent" | "izvodjac" | null (bilo koja uloga, samo da je prijavljen) */
function kuRequireAuth(role) {
  const user = KU.store.currentUser();
  if (!user) {
    const trenutna = window.location.pathname.split("/").pop() + window.location.search;
    window.location.href = "prijava.html?redirect=" + encodeURIComponent(trenutna);
    return null;
  }
  if (role && user.role !== role) {
    const panelHref = user.role === "klijent" ? "panel-klijent.html" : "panel-izvodjac.html";
    window.location.href = panelHref;
    return null;
  }
  return user;
}

/* ---------------------- Pregled potkategorija ---------------------- */
// Koristi se na potkategorije-majstor.html (vertikala "A") i
// potkategorije-ciscenje.html (vertikala "B"). Kategorije koje još nisu
// otvorene za objavu zahteva (vidi KU_CONFIG.AKTIVNE_KATEGORIJE) prikazuju
// se sa bedžom "Uskoro" i nisu klikabilne.
function kuRenderSubkategorije(vertikala) {
  const mount = document.getElementById("ku-subcat-grid");
  if (!mount) return;
  const kategorije = KU_CONFIG.KATEGORIJE.filter((k) => k.vertikala === vertikala);

  mount.innerHTML = kategorije
    .map((k) => {
      const det = KU_SUBKATEGORIJA_DETALJI[k.id] || { opis: "", svg: "" };
      const aktivna = kuKategorijaAktivna(k.id);
      const naslov = `
        <div>
          <h3>${kuEscape(k.naziv)}</h3>
          <p>${kuEscape(det.opis)}</p>
          ${aktivna ? "" : '<span class="badge badge-pending mt-2">Uskoro</span>'}
        </div>`;
      const icon = `
        <div class="subcat-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-light)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${det.svg}</svg>
        </div>`;
      if (aktivna) {
        return `<a class="subcat-card" href="novi-zahtev.html?kategorija=${encodeURIComponent(k.id)}">${icon}${naslov}</a>`;
      }
      return `<div class="subcat-card is-soon">${icon}${naslov}</div>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  await KU.ready; // sačekaj da se proveri da li je neko već prijavljen
  kuRenderDemoBanner();
  kuRenderHeader();
  kuRenderFooter();
});
