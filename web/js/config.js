/* =========================================================
   SVENAKLIK — Konfiguracija
   Ovde se menjaju stvari koje se često prilagođavaju:
   grad, kategorije, koje kategorije su trenutno "otvorene"
   za objavu zahteva (Faza 1 iz biznis plana kaže: 3-4
   najtražene kategorije, ne sve odjednom).

   Kada iz Faze 0 (ručna validacija) saznaš koje kategorije
   su stvarno najtraženije u Nišu, samo izmeni listu
   AKTIVNE_KATEGORIJE ispod — ništa drugo u kodu ne mora
   da se menja.
   ========================================================= */

const KU_CONFIG = {
  grad: "Niš",
  nazivPlatforme: "SveNaKlik.rs",

  // Podaci za povezivanje sa pravom bazom (Supabase). "anonKey" je JAVNI
  // ključ napravljen baš da se koristi u kodu sajta koji svi vide — nije
  // tajna lozinka, bezbednost čuvaju RLS pravila u db/schema.sql.
  supabase: {
    url: "https://pamtfyrfliiwyqrimmsm.supabase.co",
    anonKey: "sb_publishable_beU0tut-Q8EdSeYCugmvlw_0mDfHVBr",
  },

  // Sve kategorije iz kataloga usluga (odeljak 4 biznis plana)
  KATEGORIJE: [
    { id: "krecenje", naziv: "Krečenje", vertikala: "A" },
    { id: "gips-keramika", naziv: "Gipsarski i keramičarski radovi", vertikala: "A" },
    { id: "kupatila", naziv: "Renoviranje kupatila", vertikala: "A" },
    { id: "podovi", naziv: "Postavljanje podova", vertikala: "A" },
    { id: "fasade", naziv: "Termoizolacija i fasade", vertikala: "A" },
    { id: "vodoinstalater", naziv: "Vodoinstalaterske usluge", vertikala: "A" },
    { id: "elektricar", naziv: "Električarske usluge", vertikala: "A" },
    { id: "bela-tehnika", naziv: "Popravka bele tehnike", vertikala: "A" },
    { id: "bravar", naziv: "Bravarske usluge", vertikala: "A" },
    { id: "ciscenje-redovno", naziv: "Redovno čišćenje stana/kancelarije", vertikala: "B" },
    { id: "ciscenje-generalno", naziv: "Generalno čišćenje", vertikala: "B" },
    { id: "pranje-prozora", naziv: "Pranje prozora", vertikala: "B" },
    { id: "peglanje", naziv: "Peglanje", vertikala: "B" },
    { id: "dubinsko-pranje", naziv: "Dubinsko pranje nameštaja i tepiha", vertikala: "B" },
    { id: "auto-detailing", naziv: "Auto-detailing na adresi", vertikala: "B" },
  ],

  // Faza 1: samo ove kategorije su otvorene za objavu novog zahteva.
  // Ostale se vide na sajtu (radi kompletnosti kataloga) ali su
  // označene kao "uskoro". Promeni ovu listu kad odlučiš na
  // osnovu Faze 0 podataka.
  AKTIVNE_KATEGORIJE: [
    "krecenje",
    "kupatila",
    "ciscenje-redovno",
    "ciscenje-generalno",
  ],

  // Delovi grada / opštine — koristi se kao lokacija zahteva.
  LOKACIJE: [
    "Medijana", "Palilula", "Pantelej", "Crveni Krst", "Niška Banja", "Okolina Niša",
  ],
};

function kuKategorijaNaziv(id) {
  const k = KU_CONFIG.KATEGORIJE.find((x) => x.id === id);
  return k ? k.naziv : id;
}

function kuKategorijaAktivna(id) {
  return KU_CONFIG.AKTIVNE_KATEGORIJE.includes(id);
}

// Kratak opis + ikonica (samo unutrašnji SVG sadržaj, bez <svg> omotača) za
// stranicu pregleda potkategorija (potkategorije-majstor.html /
// potkategorije-ciscenje.html). Ne utiče na obračun cena ni na bazu — čisto
// prikaz. Ako dodaš novu kategoriju u KATEGORIJE gore, dodaj i ovde opis/ikonicu.
const KU_SUBKATEGORIJA_DETALJI = {
  "krecenje": {
    opis: "Zidovi, plafoni, po m²",
    svg: '<path d="M3 21v-4l11-11 4 4-11 11H3z"/><path d="M14 6l4 4"/>',
  },
  "gips-keramika": {
    opis: "Pločice, gips-karton radovi",
    svg: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  },
  "kupatila": {
    opis: "Kompletna renovacija, procena na licu mesta",
    svg: '<path d="M4 12h16v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-4z"/><path d="M6 12V7a2 2 0 0 1 2-2"/><path d="M9 3v2"/>',
  },
  "podovi": {
    opis: "Laminat, parket, pločice",
    svg: '<path d="M3 20h18"/><path d="M5 20V10l7-6 7 6v10"/><path d="M9 20v-6h6v6"/>',
  },
  "fasade": {
    opis: "Procena na licu mesta",
    svg: '<path d="M12 2v4"/><path d="M12 18v4"/><rect x="9" y="6" width="6" height="12" rx="3"/>',
  },
  "vodoinstalater": {
    opis: "Curenje, otpušivanje, montaža",
    svg: '<path d="M12 3c-3 3-5 6-5 9a5 5 0 0 0 10 0c0-3-2-6-5-9z"/>',
  },
  "elektricar": {
    opis: "Instalacije, kvarovi, montaža",
    svg: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
  },
  "bela-tehnika": {
    opis: "Veš mašina, frižider, šporet",
    svg: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="14" r="3"/><path d="M9 7h6"/>',
  },
  "bravar": {
    opis: "Brave, ključevi, metalne konstrukcije",
    svg: '<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1.5"/>',
  },
  "ciscenje-redovno": {
    opis: "Stan ili kancelarija, jednom ili više puta nedeljno",
    svg: '<line x1="19" y1="2" x2="10" y2="11"/><path d="M10 11 5 21h10z"/>',
  },
  "ciscenje-generalno": {
    opis: "Temeljno čišćenje, jednokratno",
    svg: '<path d="M5 9h14l-1.5 10a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2z"/><path d="M8 9a4 4 0 0 1 8 0"/><circle cx="12" cy="5" r="1"/>',
  },
  "pranje-prozora": {
    opis: "Spolja i iznutra",
    svg: '<rect x="4" y="3" width="16" height="18" rx="1"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="4" y1="12" x2="20" y2="12"/>',
  },
  "peglanje": {
    opis: "Po komadu ili paušalno",
    svg: '<path d="M12 3l1.4 5.1L19 9.5l-5.6 1.4L12 16l-1.4-5.1L5 9.5l5.6-1.4z"/>',
  },
  "dubinsko-pranje": {
    opis: "Nameštaj, tepisi, tapacirani delovi",
    svg: '<rect x="4" y="5" width="16" height="12" rx="1"/><line x1="4" y1="19" x2="4" y2="21"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/><line x1="20" y1="19" x2="20" y2="21"/>',
  },
  "auto-detailing": {
    opis: "Pranje i čišćenje vozila na tvojoj adresi",
    svg: '<path d="M3 16l1.5-5a2 2 0 0 1 2-1.5h11a2 2 0 0 1 2 1.5L21 16"/><rect x="2" y="16" width="20" height="4" rx="1"/><circle cx="7" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/>',
  },
};
