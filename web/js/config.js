/* =========================================================
   KLIK USLUGA — Konfiguracija
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
  nazivPlatforme: "Klik usluga",

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
