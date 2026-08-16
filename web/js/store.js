/* =========================================================
   KLIK USLUGA — Data layer (privremeno: localStorage)
   -----------------------------------------------------
   VAŽNO ZA SLEDEĆU FAZU: Sve funkcije ispod (KU.store.*)
   su namerno napisane kao da već pričaju sa pravom bazom —
   isto ime funkcije, isti ulaz/izlaz. Kada budemo povezivali
   pravu bazu (Supabase), menja se SAMO unutrašnjost ovih
   funkcija (npr. umesto localStorage.getItem ide poziv ka
   serveru) — nijedna HTML stranica ne mora da se dira.
   To je razlog zašto je sav pristup podacima ovde na jednom
   mestu, a ne razbacan po stranicama.
   ========================================================= */

const KU_DB_KEY = "ku_db_v1";
const KU_SESSION_KEY = "ku_session_v1";

function kuUid(prefix) {
  return (prefix || "id") + "_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

function kuNow() {
  return new Date().toISOString();
}

function kuLoadDb() {
  const raw = localStorage.getItem(KU_DB_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (e) { return null; }
}

function kuSaveDb(db) {
  localStorage.setItem(KU_DB_KEY, JSON.stringify(db));
}

function kuEmptyDb() {
  return { users: [], requests: [], offers: [], ratings: [] };
}

/* ---------------------- Demo/seed podaci ---------------------- */
function kuSeedDb() {
  const db = kuEmptyDb();

  const izvodjaci = [
    { ime: "Dragan Petrović", kategorije: ["krecenje", "gips-keramika", "kupatila"], bio: "15 godina iskustva u molersko-farbarskim i keramičarskim radovima. Radim u Nišu i okolini.", telefon: "060 111 2201" },
    { ime: "Sanja Ilić", kategorije: ["ciscenje-redovno", "ciscenje-generalno", "pranje-prozora"], bio: "Servis za čišćenje stanova i kancelarija. Ekipa od 3 osobe, dostupni radnim danima i vikendom.", telefon: "060 222 3302" },
    { ime: "Zoran Nikolić", kategorije: ["vodoinstalater", "bela-tehnika"], bio: "Vodoinstalater, hitne intervencije 0-24. Popravka bele tehnike na licu mesta.", telefon: "060 333 4403" },
    { ime: "Ivana Marković", kategorije: ["ciscenje-generalno", "dubinsko-pranje"], bio: "Generalno i dubinsko čišćenje, pranje tepiha i tapaciranog nameštaja profesionalnom mašinom.", telefon: "060 444 5504" },
    { ime: "Miloš Stanković", kategorije: ["kupatila", "podovi", "fasade"], bio: "Kompletno renoviranje kupatila i postavljanje podova. Radovi sa garancijom.", telefon: "060 555 6605" },
  ];

  const klijenti = [
    { ime: "Jelena Todorović", telefon: "064 111 0001" },
    { ime: "Marko Đorđević", telefon: "064 222 0002" },
    { ime: "Ana Ristić", telefon: "064 333 0003" },
  ];

  izvodjaci.forEach((iz, idx) => {
    db.users.push({
      id: "izv_demo_" + idx,
      role: "izvodjac",
      ime: iz.ime,
      email: "izvodjac" + idx + "@primer.rs",
      password: "demo123",
      telefon: iz.telefon,
      kategorije: iz.kategorije,
      bio: iz.bio,
      createdAt: kuNow(),
      demo: true,
    });
  });

  klijenti.forEach((k, idx) => {
    db.users.push({
      id: "kli_demo_" + idx,
      role: "klijent",
      ime: k.ime,
      email: "klijent" + idx + "@primer.rs",
      password: "demo123",
      telefon: k.telefon,
      createdAt: kuNow(),
      demo: true,
    });
  });

  // Nekoliko završenih poslova + ocena, da profili izvođača imaju istoriju
  const zavrseniPrimeri = [
    { klIdx: 0, izIdx: 0, kat: "krecenje", opis: "Krečenje dvosobnog stana, oko 55m2.", loc: "Medijana", ocena: 5, komentar: "Sve urađeno brzo i uredno, preporučujem." },
    { klIdx: 1, izIdx: 1, kat: "ciscenje-generalno", opis: "Generalno čišćenje stana pred useljenje.", loc: "Pantelej", ocena: 5, komentar: "Stan blista, došli su tačno na vreme." },
    { klIdx: 2, izIdx: 2, kat: "vodoinstalater", opis: "Curenje ispod sudopere, hitno.", loc: "Crveni Krst", ocena: 4, komentar: "Rešeno isti dan, korektna cena." },
    { klIdx: 0, izIdx: 4, kat: "kupatila", opis: "Zamena pločica i sanitarija u kupatilu.", loc: "Medijana", ocena: 5, komentar: "Profesionalno, prema dogovorenom roku." },
  ];

  zavrseniPrimeri.forEach((p, idx) => {
    const reqId = "req_demo_" + idx;
    db.requests.push({
      id: reqId,
      klijentId: "kli_demo_" + p.klIdx,
      kategorija: p.kat,
      opis: p.opis,
      lokacija: p.loc,
      zeljeniTermin: "",
      status: "zavrsen",
      createdAt: kuNow(),
      izabranaPonudaId: "off_demo_" + idx,
    });
    db.offers.push({
      id: "off_demo_" + idx,
      requestId: reqId,
      izvodjacId: "izv_demo_" + p.izIdx,
      poruka: "Mogu da izađem u dogovorenom terminu, javite se za detalje.",
      createdAt: kuNow(),
      status: "prihvacena",
    });
    db.ratings.push({
      id: "rat_demo_" + idx,
      requestId: reqId,
      izvodjacId: "izv_demo_" + p.izIdx,
      klijentId: "kli_demo_" + p.klIdx,
      ocena: p.ocena,
      komentar: p.komentar,
      createdAt: kuNow(),
    });
  });

  // Par otvorenih zahteva bez ponuda/sa ponudama, za realan prikaz table
  db.requests.push({
    id: "req_demo_open_1",
    klijentId: "kli_demo_1",
    kategorija: "ciscenje-redovno",
    opis: "Redovno nedeljno čišćenje dvosobnog stana, oko 60m2.",
    lokacija: "Medijana",
    zeljeniTermin: "Fleksibilno, radnim danima",
    status: "otvoren",
    createdAt: kuNow(),
    izabranaPonudaId: null,
  });
  db.requests.push({
    id: "req_demo_open_2",
    klijentId: "kli_demo_2",
    kategorija: "kupatila",
    opis: "Renoviranje manjeg kupatila, cca 4m2 — pločice, sanitarije, instalacije.",
    lokacija: "Pantelej",
    zeljeniTermin: "U naredna 2 meseca",
    status: "otvoren",
    createdAt: kuNow(),
    izabranaPonudaId: null,
  });
  db.offers.push({
    id: "off_demo_open_2a",
    requestId: "req_demo_open_2",
    izvodjacId: "izv_demo_4",
    poruka: "Radim ovakve poslove redovno, mogu da dođem na pregled ove nedelje.",
    createdAt: kuNow(),
    status: "poslata",
  });

  return db;
}

/* ---------------------- Javni API: KU.store ---------------------- */
const KU = window.KU || {};
KU.store = {
  init() {
    let db = kuLoadDb();
    if (!db) {
      db = kuSeedDb();
      kuSaveDb(db);
    }
    return db;
  },

  resetDemo() {
    localStorage.removeItem(KU_DB_KEY);
    localStorage.removeItem(KU_SESSION_KEY);
    this.init();
  },

  _db() {
    return kuLoadDb() || this.init();
  },

  /* ---- Korisnici ---- */
  getUsers() { return this._db().users; },
  getUserById(id) { return this.getUsers().find((u) => u.id === id) || null; },
  getUserByEmail(email) {
    const e = (email || "").trim().toLowerCase();
    return this.getUsers().find((u) => u.email.toLowerCase() === e) || null;
  },

  registerUser({ role, ime, email, password, telefon, kategorije, bio }) {
    const db = this._db();
    if (this.getUserByEmail(email)) {
      throw new Error("Nalog sa ovim email-om već postoji. Probaj da se prijaviš.");
    }
    const user = {
      id: kuUid("u"),
      role,
      ime: (ime || "").trim(),
      email: (email || "").trim().toLowerCase(),
      password, // NAPOMENA: čuvanje lozinke u localStorage je samo za demo/MVP prototip, ne za produkciju.
      telefon: (telefon || "").trim(),
      kategorije: role === "izvodjac" ? (kategorije || []) : undefined,
      bio: role === "izvodjac" ? (bio || "") : undefined,
      createdAt: kuNow(),
      demo: false,
    };
    db.users.push(user);
    kuSaveDb(db);
    this.setSession(user.id);
    return user;
  },

  updateUser(id, patch) {
    const db = this._db();
    const u = db.users.find((x) => x.id === id);
    if (!u) return null;
    Object.assign(u, patch);
    kuSaveDb(db);
    return u;
  },

  login(email, password) {
    const user = this.getUserByEmail(email);
    if (!user || user.password !== password) return null;
    this.setSession(user.id);
    return user;
  },

  logout() {
    localStorage.removeItem(KU_SESSION_KEY);
  },

  setSession(userId) {
    localStorage.setItem(KU_SESSION_KEY, userId);
  },

  currentUser() {
    const id = localStorage.getItem(KU_SESSION_KEY);
    if (!id) return null;
    return this.getUserById(id);
  },

  /* ---- Zahtevi ---- */
  getRequests() { return this._db().requests.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)); },
  getRequestById(id) { return this.getRequests().find((r) => r.id === id) || null; },
  getRequestsByKlijent(klijentId) { return this.getRequests().filter((r) => r.klijentId === klijentId); },

  createRequest({ klijentId, kategorija, opis, lokacija, zeljeniTermin }) {
    const db = this._db();
    const req = {
      id: kuUid("req"),
      klijentId,
      kategorija,
      opis: (opis || "").trim(),
      lokacija,
      zeljeniTermin: (zeljeniTermin || "").trim(),
      status: "otvoren",
      createdAt: kuNow(),
      izabranaPonudaId: null,
    };
    db.requests.push(req);
    kuSaveDb(db);
    return req;
  },

  cancelRequest(id) {
    const db = this._db();
    const r = db.requests.find((x) => x.id === id);
    if (!r) return null;
    r.status = "otkazan";
    kuSaveDb(db);
    return r;
  },

  completeRequest(id) {
    const db = this._db();
    const r = db.requests.find((x) => x.id === id);
    if (!r) return null;
    r.status = "zavrsen";
    kuSaveDb(db);
    return r;
  },

  /* ---- Ponude izvođača na zahteve ---- */
  getOffers() { return this._db().offers; },
  getOffersByRequest(requestId) {
    return this.getOffers()
      .filter((o) => o.requestId === requestId)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  },
  getOffersByIzvodjac(izvodjacId) {
    return this.getOffers().filter((o) => o.izvodjacId === izvodjacId);
  },
  hasOffered(requestId, izvodjacId) {
    return this.getOffers().some((o) => o.requestId === requestId && o.izvodjacId === izvodjacId);
  },

  createOffer({ requestId, izvodjacId, poruka }) {
    const db = this._db();
    const offer = {
      id: kuUid("off"),
      requestId,
      izvodjacId,
      poruka: (poruka || "").trim(),
      createdAt: kuNow(),
      status: "poslata",
    };
    db.offers.push(offer);
    kuSaveDb(db);
    return offer;
  },

  acceptOffer(offerId) {
    const db = this._db();
    const offer = db.offers.find((o) => o.id === offerId);
    if (!offer) return null;
    offer.status = "prihvacena";
    db.offers
      .filter((o) => o.requestId === offer.requestId && o.id !== offerId)
      .forEach((o) => { o.status = "odbijena"; });
    const req = db.requests.find((r) => r.id === offer.requestId);
    if (req) {
      req.status = "u_toku";
      req.izabranaPonudaId = offerId;
    }
    kuSaveDb(db);
    return offer;
  },

  /* ---- Ocene ---- */
  getRatings() { return this._db().ratings; },
  getRatingsByIzvodjac(izvodjacId) {
    return this.getRatings()
      .filter((r) => r.izvodjacId === izvodjacId)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  },
  hasRated(requestId) {
    return this.getRatings().some((r) => r.requestId === requestId);
  },

  addRating({ requestId, izvodjacId, klijentId, ocena, komentar }) {
    const db = this._db();
    const rating = {
      id: kuUid("rat"),
      requestId,
      izvodjacId,
      klijentId,
      ocena: Number(ocena),
      komentar: (komentar || "").trim(),
      createdAt: kuNow(),
    };
    db.ratings.push(rating);
    const req = db.requests.find((r) => r.id === requestId);
    if (req) req.status = "zavrsen";
    kuSaveDb(db);
    return rating;
  },

  /* ---- Izvedene statistike ---- */
  providerStats(izvodjacId) {
    const ratings = this.getRatingsByIzvodjac(izvodjacId);
    const count = ratings.length;
    const avg = count ? ratings.reduce((s, r) => s + r.ocena, 0) / count : 0;
    const poslovi = this.getOffers().filter(
      (o) => o.izvodjacId === izvodjacId && o.status === "prihvacena"
    ).length;
    return { avg, count, poslovi };
  },

  getIzvodjaciByKategorija(kategorijaId) {
    return this.getUsers().filter(
      (u) => u.role === "izvodjac" && (u.kategorije || []).includes(kategorijaId)
    );
  },
};

window.KU = KU;
KU.store.init();
