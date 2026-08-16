# Klik usluga — MVP

Digitalna platforma koja povezuje zanatlije i servise za čišćenje sa
korisnicima. Test tržište: Niš, Srbija.

Ovaj folder je radni prostor projekta — kod, dokumentacija i dnevnik
napretka su ovde, tako da rade između sesija sa Claude-om (pogledaj
`STATUS.md`).

## Struktura foldera

```
KlikProjekat/
├── STATUS.md              ← dnevnik projekta, počni odavde
├── README.md               ← ovaj fajl
├── docs/
│   ├── Klik_usluga_Biznis_Plan_v7.docx
│   └── Klik_usluga_Prezentacija_v7.pptx
└── web/                     ← MVP sajt (HTML/CSS/JavaScript)
    ├── index.html            (početna strana)
    ├── kako-radi.html
    ├── registracija.html
    ├── prijava.html
    ├── panel-klijent.html
    ├── novi-zahtev.html
    ├── panel-izvodjac.html
    ├── zahtev.html
    ├── profil.html
    ├── pretraga.html
    ├── moj-profil.html
    ├── css/style.css
    └── js/  (config.js, store.js, common.js)
```

## Kako da pokreneš sajt kod sebe

Sajtu nije potrebna instalacija ničega (nema npm, nema build korak). Dva
načina da ga otvoriš:

**Najjednostavnije:** dupli klik na `web/index.html` — otvoriće se u
default browseru. (Neke funkcije rade najpouzdanije ako se sajt servira
preko lokalnog servera — videti opciju ispod ako nešto ne izgleda kako
treba.)

**Preko lokalnog servera (preporučeno, izbegava sitne razlike u ponašanju
browsera):** ako imaš Python instaliran, otvori komandnu liniju u `web`
folderu i pokreni:

```
python -m http.server 8000
```

zatim otvori `http://localhost:8000` u browseru.

## Demo nalozi

Sajt dolazi sa izmišljenim demo podacima (par izvođača, klijenata i
završenih poslova) da ne izgleda prazno. Prijava:

- Klijent: `klijent0@primer.rs` / `demo123`
- Izvođač: `izvodjac0@primer.rs` / `demo123`

Dugme "Resetuj demo podatke" na vrhu svake stranice vraća sajt na početno
stanje.

## Važna napomena o podacima

Ova verzija čuva podatke lokalno u browseru (localStorage) — dobro za demo
i testiranje, ali podaci se ne dele između različitih uređaja/browsera.
Sledeći korak (opisan u `STATUS.md`) je povezivanje prave baze podataka.
